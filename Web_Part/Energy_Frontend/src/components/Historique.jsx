import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from '../layouts/Layout';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal'; 
const Historique = () => {
  const [data1, setData1] = useState({ labels: [], datasets: [] });
  const [data2, setData2] = useState({ labels: [], datasets: [] });
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [predictions, setPredictions] = useState([]);
  useEffect(() => {
    fetchHistoricalData();
  }, []);
  const fetchHistoricalData = async () => {
    try {
      const response1 = await axios.get('http://localhost:3000/api/history/1');
      const response2 = await axios.get('http://localhost:3000/api/history/1');

      if (response1.data && response1.data.length > 0) {
        const labels = response1.data.map(item => new Date(item.timestamp).toLocaleString());
        const energies = response1.data.map(item => item.energy);
        const temperatures = response1.data.map(item => item.temperatureC);
        const powerFactors = response1.data.map(item => item.pf);

        setData1({
          labels: labels,
          datasets: [
            {
              label: 'Energy',
              data: energies,
              borderColor: 'rgba(75,192,192,1)',
              fill: false,
              yAxisID: 'y1',
            },
            {
              label: 'Temperature',
              data: temperatures,
              borderColor: 'rgba(255,99,132,1)',
              fill: false,
              yAxisID: 'y2', // Identifiant unique pour l'axe y du deuxième jeu de données
            },
            {
              label: 'Power Factor',
              data: powerFactors,
              borderColor: 'rgba(153,51,255,1)',
              fill: false,
              yAxisID: 'y3', // Identifiant unique pour l'axe y du troisième jeu de données
            },
          ],
        });
      }

      if (response2.data && response2.data.length > 0) {
        const labels = response2.data.map(item => new Date(item.timestamp).toLocaleString());
        const energies = response2.data.map(item => item.energy);
        const temperatures = response2.data.map(item => item.temperatureC);
        const powerFactors = response2.data.map(item => item.pf);

        setData2({
          labels: labels,
          datasets: [
            {
              label: 'Energy',
              data: energies,
              borderColor: 'rgba(75,192,192,1)',
              fill: false,
              yAxisID: 'y4', // Identifiant unique pour l'axe y du premier jeu de données de data2
            },
            {
              label: 'Temperature',
              data: temperatures,
              borderColor: 'rgba(255,99,132,1)',
              fill: false,
              yAxisID: 'y5', // Identifiant unique pour l'axe y du deuxième jeu de données de data2
            },
            {
              label: 'Power Factor',
              data: powerFactors,
              borderColor: 'rgba(153,51,255,1)',
              fill: false,
              yAxisID: 'y6', // Identifiant unique pour l'axe y du troisième jeu de données de data2
            },
          ],
        });
      }

    } catch (error) {
      console.error('Erreur lors de la récupération des données historiques :', error);
    }
  };
  const weatherForecast = [
    
      { day: "Mercredi", temperature: 23.02 },
      { day: "Jeudi", temperature: 20.52 },
      { day: "Vendredi", temperature: 19.90 },
      { day: "Samedi", temperature: 17.15 },
      { day: "Dimanche", temperature: 16.61 },
    ];
    


  const currentData = {
    voltage: 237.3, // en volts
    current: 0.08, // en ampères
    frequency: 50, // en Hz
    temperature: 19.69, // en degrés Celsius
    energy: 1.5, // en kWh
  };

  const calculatePredictions = () => {
    const baseConsumption = currentData.energy; // Consommation actuelle en kWh
    const predictions = weatherForecast.map((forecast) => {
      // Ajustement basé sur la différence de température
      const tempDiff = forecast.temperature - currentData.temperature;
      const adjustmentFactor = 1 + tempDiff * 0.05; // Hypothèse : 5% d'augmentation/diminution par °C
      const predictedEnergy = baseConsumption * adjustmentFactor;

      return {
        day: forecast.day,
        temperature: forecast.temperature,
        predictedEnergy: predictedEnergy.toFixed(2), // Arrondi à 2 décimales
      };
    });

    setPredictions(predictions);
    setModalIsOpen(true);
  };
  return (
    <Layout header={1} footer={1}>
<button
        onClick={calculatePredictions}
        className="btn"
        style={{ color: "black", backgroundColor: "goldenrod" }}
      >
        Predire consommation
      </button>      <div style={{width:"70%", marginLeft:"15%"}}>
      <h2 style={{color:"#13678A" , textAlign:"center"}}>Climatiseur</h2>

<Line
  data={data1}
  options={{
    scales: {
      x: {
        display: false, // Ne pas afficher l'axe X
      },
      y: {
        type: 'linear',
        display: true,
        position: 'left',
      },
      y1: {
        type: 'linear',
        display: true,
        position: 'left',
        grid: {
          drawOnChartArea: false,
        },
        title: {
          display: true,
          text: 'Energy (kWh)', // Unité pour Energy
          color: 'rgba(75,192,192,1)',
        },
      },
      y2: {
        type: 'linear',
        display: true,
        position: 'right',
        grid: {
          drawOnChartArea: false,
        },
        title: {
          display: true,
          text: 'Temperature (°C)', // Unité pour Temperature
          color: 'rgba(255,99,132,1)',
        },
      },
      y3: {
        type: 'linear',
        display: true,
        position: 'right',
        grid: {
          drawOnChartArea: false,
        },
        title: {
          display: true,
          text: 'Power Factor', // Pas d'unité pour Power Factor
          color: 'rgba(153,51,255,1)',
        },
      },
    },
  }}
/>
<h2 style={{color:"#13678A" , textAlign:"center"}}>Ventilateur</h2>

<Line
  data={data1}
  options={{
    scales: {
      x: {
        display: false, // Ne pas afficher l'axe X
      },
      y: {
        type: 'linear',
        display: true,
        position: 'left',
      },
      y1: {
        type: 'linear',
        display: true,
        position: 'left',
        grid: {
          drawOnChartArea: false,
        },
        title: {
          display: true,
          text: 'Energy (kWh)', // Unité pour Energy
          color: 'rgba(75,192,192,1)',
        },
      },
      y2: {
        type: 'linear',
        display: true,
        position: 'right',
        grid: {
          drawOnChartArea: false,
        },
        title: {
          display: true,
          text: 'Temperature (°C)', // Unité pour Temperature
          color: 'rgba(255,99,132,1)',
        },
      },
      y3: {
        type: 'linear',
        display: true,
        position: 'right',
        grid: {
          drawOnChartArea: false,
        },
        title: {
          display: true,
          text: 'Power Factor', // Pas d'unité pour Power Factor
          color: 'rgba(153,51,255,1)',
        },
      },
    },
  }}
/>

<h2 style={{color:"#13678A" , textAlign:"center"}}>Refregirateur</h2>
<Line
  data={data2}
  options={{
    scales: {
      x: {
        display: false, // Ne pas afficher l'axe X
      },
      y: {
        type: 'linear',
        display: true,
        position: 'left',
      },
      y4: {
        type: 'linear',
        display: true,
        position: 'left',
        grid: {
          drawOnChartArea: false,
        },
        title: {
          display: true,
          text: 'Energy (kWh)', // Unité pour Energy
          color: 'rgba(75,192,192,1)',
        },
      },
      y5: {
        type: 'linear',
        display: true,
        position: 'right',
        grid: {
          drawOnChartArea: false,
        },
        title: {
          display: true,
          text: 'Temperature (°C)', // Unité pour Temperature
          color: 'rgba(255,99,132,1)',
        },
      },
      y6: {
        type: 'linear',
        display: true,
        position: 'right',
        grid: {
          drawOnChartArea: false,
        },
        title: {
          display: true,
          text: 'Power Factor', // Pas d'unité pour Power Factor
          color: 'rgba(153,51,255,1)',
        },
      },
    },
  }}
/>
<Modal
  isOpen={modalIsOpen}
  onRequestClose={() => setModalIsOpen(false)}
  style={{
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      zIndex: 1000,
    },
    content: {
      maxWidth: "600px",
      margin: "auto",
      maxHeight: "500px",

      borderRadius: "10px",
      padding: "20px",
      border: "none",
      backgroundColor: "#fff",
      boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)",
    },
  }}
>
  <h2 style={{ fontSize: "24px", color: "#333", marginBottom: "20px" ,fontWeight:"normal"}}>
    Prédictions de <strong style={{color:"darkgreen"}}>consommation énergétique</strong> <br /><pre style={{margin:"0 auto", textAlign:"center" , color:"blue"}}>pour les 5 jours suivants !</pre> 
  </h2>
  <ul style={{ listStyleType: "none", padding: 0 }}>
    {predictions.map((prediction, index) => (
      <li
        key={index}
        style={{
          marginBottom: "10px",
          padding: "10px",
          backgroundColor: "#f9f9f9",
          borderRadius: "8px",
          boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
        }}
      >
        <strong style={{ color: "#007BFF" }}>{prediction.day}</strong>:{" "}
        <span style={{ color: "#333" }}>
          {prediction.predictedEnergy} kWh
        </span>{" "}
        (Température :{" "}
        <span style={{ fontWeight: "bold", color: "#FF5733" }}>
          {prediction.temperature}°C
        </span>
        )
      </li>
    ))}
  </ul>
  <button
    onClick={() => setModalIsOpen(false)}
    style={{
      display: "block",
      margin: "20px auto 0",
      padding: "10px 20px",
      backgroundColor: "#007BFF",
      color: "#fff",
      border: "none",
      borderRadius: "5px",
      fontSize: "16px",
      cursor: "pointer",
      boxShadow: "0px 3px 10px rgba(0, 0, 0, 0.2)",
    }}
  >
    Fermer
  </button>
</Modal>

      </div>
    </Layout>
  );
};

export default Historique;
