// Include necessary libraries
#if defined(ESP32)
#include <WiFiMulti.h>
WiFiMulti wifiMulti;
#define DEVICE "ESP32"
#elif defined(ESP8266)
#include <ESP8266WiFiMulti.h>
ESP8266WiFiMulti wifiMulti;
#define DEVICE "ESP8266"
#endif

#include <InfluxDbClient.h>
#include <InfluxDbCloud.h>
#include <PZEM004Tv30.h>
#include <OneWire.h>
#include <DallasTemperature.h>
#include <HTTPClient.h>
#include <ArduinoJson.h>
#include <WiFiClient.h>

#define WIFI_SSID "sarra"
#define WIFI_PASSWORD "yebhim123"
#define INFLUXDB_URL "http://192.168.43.226:8086"
#define INFLUXDB_TOKEN "jyFqlziDXVA0kl7522EUM25GRwa55ImM8FunNg4BUbM65NpSQ7OmZUotaRBTu1J1cWKUm5E8WPLE2KkNeBmgGg=="
#define INFLUXDB_ORG "master"
#define INFLUXDB_BUCKET "master_32"
#define INFLUXDB_MEASUREMENT "master_32_sensors"

// Set timezone
#define TZ_INFO "CET-1"

// PZEM-004T Pins
#define PZEM1_RX_PIN 4
#define PZEM1_TX_PIN 5
#define PZEM2_RX_PIN 19
#define PZEM2_TX_PIN 21

// DS18B20 Pins
#define ONE_WIRE_BUS1 15
#define ONE_WIRE_BUS2 18

PZEM004Tv30 pzem1(Serial2, PZEM1_RX_PIN, PZEM1_TX_PIN);
PZEM004Tv30 pzem2(Serial1, PZEM2_RX_PIN, PZEM2_TX_PIN);
OneWire oneWire1(ONE_WIRE_BUS1);
DallasTemperature sensors1(&oneWire1);
OneWire oneWire2(ONE_WIRE_BUS2);
DallasTemperature sensors2(&oneWire2);

// InfluxDB client instance with preconfigured InfluxCloud certificate
InfluxDBClient client(INFLUXDB_URL, INFLUXDB_ORG, INFLUXDB_BUCKET, INFLUXDB_TOKEN, InfluxDbCloud2CACert);
// Data point for price
Point sensor3(INFLUXDB_MEASUREMENT);
Point sensor1(INFLUXDB_MEASUREMENT);
Point sensor2(INFLUXDB_MEASUREMENT);
float totalEnergy1 = 0.0;
float totalEnergy2 = 0.0;
int fid = 1;
int sid = 2;
float price;
// Structure for a history entry
struct HistoryEntry {
  float energy;
  float temperatureC;
  float power;
  float pf;
  float frequency;
  float totalEnergy;
  float voltage;
  float current;
  float price;
};

// Arrays to store history
HistoryEntry history1[100]; // Max history size for device 1
HistoryEntry history2[100]; // Max history size for device 2
int historyIndex1 = 0;
int historyIndex2 = 0;

void setup() {
  Serial.begin(115200);

  // Setup wifi
  WiFi.mode(WIFI_STA);
  wifiMulti.addAP(WIFI_SSID, WIFI_PASSWORD);

  Serial.print("Connecting to wifi");
  while (wifiMulti.run() != WL_CONNECTED) {
    Serial.print(".");
    delay(100);
  }
  Serial.println();

  // Add tags
  sensor1.addTag("appareil1", DEVICE);
  sensor1.addTag("sensor", "PZEM1_DS18B20_1");

  sensor2.addTag("appareil2", DEVICE);
  sensor2.addTag("sensor", "PZEM2_DS18B20_2");
  sensor3.addTag("appareil3", DEVICE);
  sensor3.addTag("sensor", "Total_price"); // Ajouter un tag pour identifier le prix

  // Sync time
  timeSync(TZ_INFO, "pool.ntp.org", "time.nis.gov");

  // Check server connection
  if (client.validateConnection()) {
    Serial.print("Connected to InfluxDB: ");
    Serial.println(client.getServerUrl());
  } else {
    Serial.print("InfluxDB connection failed: ");
    Serial.println(client.getLastErrorMessage());
  }

  // Start the DS18B20 sensors
  sensors1.begin();
  sensors2.begin();

}

void loop() {
  // Clear fields for reusing the points. Tags will remain untouched
  sensor1.clearFields();
  sensor2.clearFields();
  sensor3.clearFields();


  // Read data from the first PZEM-004T module
  float voltage1 = pzem1.voltage();
  float current1 = pzem1.current();
  float power1 = pzem1.power();
  float energy1 = pzem1.energy();
  float frequency1 = pzem1.frequency();
  float pf1 = pzem1.pf();

  // Print diagnostic messages
  Serial.print("Device 1 - Voltage: ");
  Serial.println(voltage1);
  Serial.print("Device 1 - Current: ");
  Serial.println(current1);
  Serial.print("Device 1 - Power: ");
  Serial.println(power1);
  Serial.print("Device 1 - Energy: ");
  Serial.println(energy1);
  Serial.print("Device 1 - Frequency: ");
  Serial.println(frequency1);
  Serial.print("Device 1 - Power Factor: ");
  Serial.println(pf1);

  // Calculate total energy consumption for the first device
  float activePower1 = pzem1.power(); // Active power in watts (W)
  if (!isnan(activePower1)) {
    totalEnergy1 += activePower1 / 3600.0; // Convert power from watts to kilowatt-hours (kWh)
  } else {
    Serial.println("Error reading power from PZEM1");
  }

  // Read data from the second PZEM-004T module
  float voltage2 = pzem2.voltage();
  float current2 = pzem2.current();
  float power2 = pzem2.power();
  float energy2 = pzem2.energy();
  float frequency2 = pzem2.frequency();
  float pf2 = pzem2.pf();

  // Print diagnostic messages
  Serial.print("Device 2 - Voltage: ");
  Serial.println(voltage2);
  Serial.print("Device 2 - Current: ");
  Serial.println(current2);
  Serial.print("Device 2 - Power: ");
  Serial.println(power2);
  Serial.print("Device 2 - Energy: ");
  Serial.println(energy2);
  Serial.print("Device 2 - Frequency: ");
  Serial.println(frequency2);
  Serial.print("Device 2 - Power Factor: ");
  Serial.println(pf2);

  // Calculate total energy consumption for the second device
  float activePower2 = pzem2.power(); // Active power in watts (W)
  if (!isnan(activePower2)) {
    totalEnergy2 += activePower2 / 3600.0; // Convert power from watts to kilowatt-hours (kWh)
  } else {
    Serial.println("Error reading power from PZEM2");
  }

  // Read temperature from the first DS18B20 sensor
  sensors1.requestTemperatures();
  float temperatureC1 = sensors1.getTempCByIndex(0);

  // Read temperature from the second DS18B20 sensor
  sensors2.requestTemperatures();
  float temperatureC2 = sensors2.getTempCByIndex(0);
// Ajouter le champ du prix
sensor3.addField("price", price);
if (!client.writePoint(sensor3)) {
  Serial.print("Échec de l'écriture du prix dans InfluxDB: ");
  Serial.println(client.getLastErrorMessage());
} else {
  Serial.println("Prix écrit dans InfluxDB avec succès.");
}
  // Check if data is valid for the first device
  if (!isnan(voltage1) && !isnan(current1) && !isnan(power1) && !isnan(energy1) && !isnan(frequency1) && !isnan(pf1)) {
    // Store measured values into the point
    sensor1.addField("voltage", voltage1);
    sensor1.addField("current", current1);
    sensor1.addField("power", power1);
    sensor1.addField("energy", energy1);
    sensor1.addField("frequency", frequency1);
    sensor1.addField("pf", pf1);
    sensor1.addField("totalEnergy", totalEnergy1);
    sensor1.addField("temperatureC", temperatureC1); // Add temperature reading to InfluxDB

    // Store data into history for device 1
    if (historyIndex1 < 100) {
      history1[historyIndex1].energy = energy1;
      history1[historyIndex1].temperatureC = temperatureC1;
      history1[historyIndex1].power = power1;
      history1[historyIndex1].pf = pf1;
      history1[historyIndex1].frequency = frequency1;
      history1[historyIndex1].totalEnergy = totalEnergy1;
      history1[historyIndex1].voltage = voltage1;
      history1[historyIndex1].current = current1;
      history1[historyIndex1].price=price;
      historyIndex1++;
    }

    // Write to InfluxDB
    if (!client.writePoint(sensor1)) {
      Serial.print("InfluxDB write failed for device 1: ");
      Serial.println(client.getLastErrorMessage());
    } else {
      Serial.println("Data written to InfluxDB for device 1.");
    }
  }

  // Check if data is valid for the second device
  if (!isnan(voltage2) && !isnan(current2) && !isnan(power2) && !isnan(energy2) && !isnan(frequency2) && !isnan(pf2)) {
    // Store measured values into the point
    sensor2.addField("voltage", voltage2);
    sensor2.addField("current", current2);
    sensor2.addField("power", power2);
    sensor2.addField("energy", energy2);
    sensor2.addField("frequency", frequency2);
    sensor2.addField("pf", pf2);
    sensor2.addField("totalEnergy", totalEnergy2);
    sensor2.addField("temperatureC", temperatureC2); // Add temperature reading to InfluxDB

    // Store data into history for device 2
    if (historyIndex2 < 100) {
      history2[historyIndex2].energy = energy2;
      history2[historyIndex2].temperatureC = temperatureC2;
      history2[historyIndex2].power = power2;
      history2[historyIndex2].pf = pf2;
      history2[historyIndex2].frequency = frequency2;
      history2[historyIndex2].totalEnergy = totalEnergy2;
      history2[historyIndex2].voltage = voltage2;
      history2[historyIndex2].current = current2;
      history2[historyIndex2].price=price;
      historyIndex2++;
    }

    // Write to InfluxDB
    if (!client.writePoint(sensor2)) {
      Serial.print("InfluxDB write failed for device 2: ");
      Serial.println(client.getLastErrorMessage());
    } else {
      Serial.println("Data written to InfluxDB for device 2.");
    }
  }

  price = (totalEnergy1 + totalEnergy2) * 414;

  // Print total price to serial monitor
  Serial.print("Total Price: ");
  Serial.println(price);

  // Send historical data to server if available
  if (historyIndex1 > 0 || historyIndex2 > 0) {
    sendHistoricalData();
  }

  delay(10000); // Wait 10 seconds before next loop
}
 void sendPriceToBackend(float price) {
  // Create JSON object to send data
  StaticJsonDocument<200> jsonDoc;
  jsonDoc["price"] = price;

  // Serialize JSON to string
  String jsonString;
  serializeJson(jsonDoc, jsonString);

  // Send JSON data to server
  HTTPClient http;
  http.begin("http://localhost:3000/api/price");
  http.addHeader("Content-Type", "application/json");

  int httpResponseCode = http.POST(jsonString);

  if (httpResponseCode > 0) {
    Serial.print("Price sent successfully to backend. Response code: ");
    Serial.println(httpResponseCode);
  } else {
    Serial.print("Error sending price to backend. Error code: ");
    Serial.println(httpResponseCode);
    Serial.println(http.errorToString(httpResponseCode));
  }

  http.end();
}

void sendHistoricalData() {
  // Create a JSON object to store historical data
  StaticJsonDocument<1024> jsonDoc;

  // Add historical data for device 1
  if (historyIndex1 > 0) {
    JsonArray historyArray1 = jsonDoc.createNestedArray("device1_history");
    for (int i = 0; i < historyIndex1; i++) {
      JsonObject entry = historyArray1.createNestedObject();
      entry["energy"] = history1[i].energy;
      entry["temperatureC"] = history1[i].temperatureC;
      entry["power"] = history1[i].power;
      entry["frequency"] = history1[i].frequency;
      entry["totalEnergy"] = history1[i].totalEnergy;
      entry["current"] = history1[i].current;
      entry["voltage"] = history1[i].voltage;
      entry["pf"] = history1[i].pf;
      entry["price"] = history1[i].price;
      entry["deviceId"] = fid;
    }
  }

  // Add historical data for device 2
  if (historyIndex2 > 0) {
    JsonArray historyArray2 = jsonDoc.createNestedArray("device2_history");
    for (int i = 0; i < historyIndex2; i++) {
      JsonObject entry = historyArray2.createNestedObject();
      entry["energy"] = history2[i].energy;
      entry["temperatureC"] = history2[i].temperatureC;
      entry["power"] = history2[i].power;
      entry["frequency"] = history2[i].frequency;
      entry["totalEnergy"] = history2[i].totalEnergy;
      entry["current"] = history2[i].current;
      entry["voltage"] = history2[i].voltage;
      entry["pf"] = history2[i].pf;
      entry["price"] = history2[i].price;
      entry["deviceId"] = sid;
    }
  }

  // Serialize JSON to string
  String jsonString;
  serializeJson(jsonDoc, jsonString);

  // Send JSON data to server
  HTTPClient http;
  http.begin("http://192.168.43.226:3000/save-history"); // Make sure the URL is correct
  http.addHeader("Content-Type", "application/json");
  int httpResponseCode = http.POST(jsonString);

  if (httpResponseCode > 0) {
    Serial.print("Historical data sent successfully. Response code: ");
    Serial.println(httpResponseCode);
  } else {
    Serial.print("Error sending historical data. Error code: ");
    Serial.println(httpResponseCode);
    Serial.println(http.errorToString(httpResponseCode)); // Print more details on HTTP error
  }

  http.end();

  // Clear history arrays after sending
  historyIndex1 = 0;
  historyIndex2 = 0;

  delay(20000); // Wait 20 seconds before next loop
}
void retrieveHistoricalData() {
  HTTPClient http;
  http.begin("http://192.168.43.226:3000/get-last-history"); // Endpoint pour récupérer les dernières données historiques
  int httpResponseCode = http.GET();

  if (httpResponseCode > 0) {
    String payload = http.getString();
    // Désérialisation du JSON pour récupérer les données historiques
    StaticJsonDocument<1024> jsonDoc;
    DeserializationError error = deserializeJson(jsonDoc, payload);

    if (error == DeserializationError::Ok) { // Vérifier si la désérialisation a réussi
      // Extraction des données historiques pour chaque appareil
      JsonArray device1History = jsonDoc["device1_history"];
      for (int i = 0; i < device1History.size(); i++) {
        history1[i].energy = device1History[i]["energy"];
        history1[i].temperatureC = device1History[i]["temperatureC"];
        // Ajouter les autres champs historiques ici
      }

      JsonArray device2History = jsonDoc["device2_history"];
      for (int i = 0; i < device2History.size(); i++) {
        history2[i].energy = device2History[i]["energy"];
        history2[i].temperatureC = device2History[i]["temperatureC"];
        // Ajouter les autres champs historiques ici
      }

      // Mettre à jour les index d'historique
      historyIndex1 = device1History.size();
      historyIndex2 = device2History.size();

      Serial.println("Historical data retrieved successfully.");
    } else {
      Serial.println("Failed to parse JSON or empty response.");
    }
  } else {
    Serial.print("Error retrieving historical data. Error code: ");
    Serial.println(httpResponseCode);
    Serial.println(http.errorToString(httpResponseCode));
  }

  http.end();
}
