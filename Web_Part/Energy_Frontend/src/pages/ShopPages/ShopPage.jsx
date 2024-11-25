import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "../../layouts/Layout";
import { gsapTitleAnimation } from "../../lib/gsap-lib/gsapTitleAnimation";
import DataChart from "../../components/DataChart";
import GaugeChartComponent from "../../components/GaugeChart";
import axios from 'axios';


const ShopPage = () => {
  const [en1Data, setEn1Data] = useState(null);
  const [powData, setPowData] = useState(null);
  const [pFData, setPFData] = useState(null);
  const [tempData, setTempData] = useState(null);

  useEffect(() => {
    gsapTitleAnimation();
  }, []);
  useEffect(() => {
    const fetchEnergyOneData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/data/PZEM1_DS18B20_1/totalEnergy');
        const data = response.data;

        if (data && data.length > 0) {
          const latestEntry = data.reduce((latest, entry) => {
            return new Date(entry._time) > new Date(latest._time) ? entry : latest;
          });
          setEn1Data(latestEntry._value);
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des données pour le capteur 1:', error);
      }
    };

    fetchEnergyOneData();
    const fetchPowerOneData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/data/PZEM1_DS18B20_1/power');
        const data = response.data;

        if (data && data.length > 0) {
          const latestEntry = data.reduce((latest, entry) => {
            return new Date(entry._time) > new Date(latest._time) ? entry : latest;
          });
          setPowData(latestEntry._value);
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des données pour le capteur 1:', error);
      }
    };
    fetchPowerOneData();
    const fetchTempOneData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/data/PZEM1_DS18B20_1/temperatureC');
        const data = response.data;

        if (data && data.length > 0) {
          const latestEntry = data.reduce((latest, entry) => {
            return new Date(entry._time) > new Date(latest._time) ? entry : latest;
          });
          setTempData(latestEntry._value);
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des données pour le capteur 1:', error);
      }
    };
    fetchTempOneData();
    const fetchPFOneData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/data/PZEM1_DS18B20_1/pf');
        const data = response.data;

        if (data && data.length > 0) {
          const latestEntry = data.reduce((latest, entry) => {
            return new Date(entry._time) > new Date(latest._time) ? entry : latest;
          });
          setPFData(latestEntry._value);
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des données pour le capteur 1:', error);
      }
    };

    fetchPFOneData();

  }, []);
  
  const { sensor } = useParams();

  const fields = [
    "frequency",
    "voltage",
    "current",
    "energy",
    "totalEnergy",
    "power",
    "pf",
    "temperatureC",
    "priceMillimes",
  ];
  const [data, setData] = useState({
    temperatureC: null,
    power: null,
    pf: null,
    totalEnergy:null,
  });

  useEffect(() => {
    // Simulez une récupération de données (par exemple, via une API REST)
    const fetchData = async () => {
      try {
        // Exemple : remplacer par votre propre API ou logique de récupération
        const response = await fetch(`/api/sensor-data?sensor=${sensor}`);
        const result = await response.json();
        setData({
          temperatureC: result.temperatureC,
          power: result.power,
          pf: result.pf,
        });
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
      }
    };

    fetchData();
  }, [sensor]);


  const gaugeFields = ["voltage", "current", "frequency"];

  return (
    <Layout header={1} footer={1}>

<div
        className="rectangle-container"
        style={{
          display: "flex",
          justifyContent: "space-around",
          padding: "10px",
        }}
      >
        {/* Rectangle pour temperatureC */}
        <div
          style={{
            width: "280px",
            height: "130px",
            background: "linear-gradient(45deg, #007566, #74D333)", 
            borderRadius: "8px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            fontSize: "24px",
            fontWeight:'bolder'
          

          }}
        >
          <img src={`./img/images/temp.png`} style={{ width: "100px" }}></img>
          {tempData !== null ? `${tempData} °C` : "48 °C"}
        </div>

        {/* Rectangle pour power */}
        <div
          style={{
            width: "280px",
            height: "130px",
            background: "linear-gradient(-45deg, #87E5FF, #00B1E8)",
            borderRadius: "8px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            fontSize: "24px",
            fontWeight:'bolder'

          }}
        >          
        <img src={`./img/images/p.png`} style={{ width: "100px" }}></img>

          {powData !== null ? `${powData} Watt` : "1578  Watt"}
        </div>
        <div
          style={{
            width: "280px",
            height: "130px",
            background: "linear-gradient(30deg, #FF93BE, #E8026C)",
            borderRadius: "8px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            fontSize: "24px",
            fontWeight:'bolder'

          }}
        >
          <img src={`./img/images/en.png`} style={{ width: "100px" }}></img>
          {en1Data !== null ? `${en1Data} W` : "2584  W"}
        </div>
        {/* Rectangle pour pf */}
        <div
          style={{
            width: "280px",
            height: "130px",
            background: "linear-gradient(90deg, #D3AFE3, #8D7099)",
            borderRadius: "8px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            fontSize: "24px",
            fontWeight:'bolder',
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)", 
          }}
        >
                  <img src={`./img/images/cos.png`} style={{ width: "80px", marginRight:'20px' }}></img>

          {pFData !== null ? `${pFData}` : "uu"}
        </div>
      </div>

      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            marginBottom: "50px",
            marginTop: "60px",
          }}
        >
          {gaugeFields.map((field) => (
            <div key={field} style={{ width: "300px" }}>
              <GaugeChartComponent sensor={sensor} field={field} />
            </div>
          ))}
      
          <div style={{ width: "300px" }}>
            <GaugeChartComponent sensor={sensor} field="temperatureC" />
          </div>
          <div style={{ width: "300px" }}>
            <GaugeChartComponent sensor={sensor} field="energy" />
          </div>
          
        </div>
        <div               style={{display: "flex",flexDirection:'row', justifyContent: "space-around", padding: "10px"}}
        >
        {fields
          .filter(
            (field) =>
              !gaugeFields.includes(field) &&
              field !== "energy" &&
              field !== "temperatureC" &&
              field !== "priceMillimes"
          )
          .map((field) => (
            <div
              key={field}
              style={{marginBottom: "50px",width:"30%" }}
            >
              <DataChart sensor={sensor} field={field} />
            </div>
          ))}
      </div>
      </div>
    </Layout>
  );
};

export default ShopPage;
