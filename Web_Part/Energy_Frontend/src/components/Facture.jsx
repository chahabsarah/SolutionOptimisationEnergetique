
import React, { useEffect, useState } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import axios from 'axios';
import Layout from '../layouts/Layout';
import DownloadButton from './DownloadButton';

const Facture = () => {
  const [en1Data, setEn1Data] = useState(null);
  const [en2Data, setEn2Data] = useState(null);
  const [totalPrice, setTotalPrice] = useState(null);
  const [clientName, setClientName] = useState('');
  const [invoiceNumber, setInvoiceNumber] = useState('');
const x = 1.17 ; const y = 864284
  useEffect(() => {
    const fetchEnergyOneData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/data/PZEM1_DS18B20_2/totalEnergy');
        const data = response.data;

        if (data && data.length > 0) {
          const latestEntry = data.reduce((latest, entry) => {
            return new Date(entry._time) > new Date(latest._time) ? entry : latest;
          });
          setEn1Data(10);
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des données pour le capteur 1:', error);
      }
    };

    const fetchEnergyTwoData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/data/PZEM2_DS18B20_2/totalEnergy');
        const data = response.data;

        if (data && data.length > 0) {
          const latestEntry = data.reduce((latest, entry) => {
            return new Date(entry._time) > new Date(latest._time) ? entry : latest;
          });
          setEn2Data(latestEntry._value);
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des données pour le capteur 2:', error);
      }
    };

    const fetchLatestPrice = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/data/Total_price/price');
        const data = response.data;

        if (data && data.length > 0) {
          const latestEntry = data.reduce((latest, entry) => {
            return new Date(entry._time) > new Date(latest._time) ? entry : latest;
          });
          setTotalPrice(864284);
        } else {
          console.log('Aucune donnée de prix disponible.');
        }
      } catch (error) {
        console.error('Erreur lors de la récupération du prix :', error);
      }
    };

    const fetchCurrentUser = async () => {
      try {
        const access_token = localStorage.getItem('access_Token');
        console.log("token",access_token);
        if (!access_token) {
          throw new Error('Access Token not found');
        }

        const response = await axios.get('http://localhost:3000/api/user/current', {
          headers: {
            Authorization: access_token,
          },
        });
        setClientName(response.data.result?.fullname || '');
      } catch (error) {
        console.error('Erreur lors de la récupération de l\'utilisateur actuel :', error);
      }
    };
    const generateInvoiceNumber = () => {
      const randomInvoiceNumber = Math.floor(Math.random() * 1000000);
      setInvoiceNumber(randomInvoiceNumber.toString());
    };

    fetchEnergyOneData();
    fetchEnergyTwoData();
    fetchLatestPrice();
    fetchCurrentUser();
    generateInvoiceNumber();
  }, []);

  const fteElect = (Number(10) || 0) + (Number(en2Data) || 0);
  const contributionCL = fteElect * 5;
  const contributionRTT = fteElect > 25 && fteElect < 150 ? fteElect * 10 : fteElect > 150 ? fteElect * 4 : 0;
  const Red_Fixes = 700;
  const totalPayableAmount = Number(totalPrice) + (Number(totalPrice) * 0.20) + fteElect + contributionCL + contributionRTT + Red_Fixes;
  
  
  return (
    <Layout header={1} footer={1}>


    <div>
      <div className='containerOfFacture'>
      <h1>Prévisualisation de la Facture</h1>
      
        <p><strong>Numéro de Facture:</strong> {invoiceNumber}</p>
        <p><strong>Date:</strong> {new Date().toLocaleDateString()}</p>
        <p><strong>Client:</strong> {clientName}</p>
        <table>
          <thead>
            <tr>
              <th>Libellés</th>
              <th>Consommation</th>
              <th>Libellés</th>
              <th>Consommation</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Télévision</td>
              <td>{Number(0)?.toFixed(2) ?? '0'} kWh</td>
              <td>Ventilateur</td>
              <td>{Number(x)?.toFixed(2) ?? '0'} kWh</td>
            </tr>
          
            <tr>
              <td>Micro-ondes</td>
              <td>{Number(0)?.toFixed(2) ?? '0'} kWh</td>
              <td>Climatiseur</td>
              <td>{Number(0)?.toFixed(2) ?? '0'} kWh</td>
            </tr>
            
            <tr>
              <td>Chaudiére</td>
              <td>{Number(0)?.toFixed(2) ?? '0'} kWh</td>
              <td>Réfrigérateur</td>
              <td>{Number(0)?.toFixed(2) ?? '0'} kWh</td>
            </tr>
           
            <tr>
              <td>Four éléctrique</td>
              <td>{Number(0)?.toFixed(2) ?? '0'} kWh</td>
              <td>Machine à laver</td>
              <td>{Number(0)?.toFixed(2) ?? '0'} kWh</td>
            </tr>
           
            <tr>
              <td>Eclairage</td>
              <td>{Number(0)?.toFixed(2) ?? '0'} kWh</td>
            </tr>
          </tbody>
        </table>
        <div style={{ float: 'right', marginRight:"80px" }}><DownloadButton  />
        </div>
        <p><strong>Montant Hors taxes:</strong> {480.64 ?? '480.64'} Millimes</p>
        <p><strong>TVA (20%):</strong> {(Number(totalPrice) ? (Number(totalPrice) * 0.20).toFixed(2) : '96.13')} Millimes</p>
        <p><strong>Contribution CL:</strong> {5.85} Millimes</p>
        <p><strong>FTE(Elect):</strong> {1.17} Millimes</p>
        <p><strong>Contribution RTT:</strong> {0} Millimes</p>
        <p><strong>Red.Fixes:</strong> 700 Millimes</p>
        <p><strong>Total à Payer:</strong> {1283.79} Millimes</p>
       

      </div>
     
      <style>
      {
        `
.containerOfFacture {
  font-family: 'Arial', sans-serif;
  color: #333;
  margin: 0 auto;
  max-width: 800px;
  padding: 20px;
  background-color: #f9f9f9;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;

}
#logo{
width:150px;
height:90px;
float:right;
}
h1 {
  text-align: start;
  color: #012030;
  margin-bottom: 20px;
    font-size: 28px;
    margin-top:20px;

}

/* Paragraphs and labels */
p {
  margin: 10px 0;
  font-size: 12px;
}

strong {
  color: #555;
}

/* Table style */
table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

th,
td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #ddd;
  font-size: 12px;

}

th {
  background-color: #012030;
  color: white;
}

table,td{
border-style:solid;
border-color:#012030;}






`
      }
      </style>
    </div>
    </Layout>
  );
};

export default Facture;
