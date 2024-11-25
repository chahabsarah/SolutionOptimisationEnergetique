import React, { useEffect, useState } from 'react';
import Lottie from 'react-lottie';
import animationData from './Animation - 1731798998961.json';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import axios from 'axios';
import energyFlowLogo from './eflogo.png';
const DownloadButton = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  const [en1Data, setEn1Data] = useState(null);
  const [en2Data, setEn2Data] = useState(null);
  const [totalPrice, setTotalPrice] = useState(null);
  const [clientName, setClientName] = useState('');
  const [invoiceNumber, setInvoiceNumber] = useState('');

  useEffect(() => {
    const fetchEnergyOneData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/data/PZEM1_DS18B20_2/totalEnergy');
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
          setTotalPrice(latestEntry._value);
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

  const fteElect = (Number(en1Data) || 0) + (Number(en2Data) || 0);
  const contributionCL = fteElect * 5;
  const contributionRTT = fteElect > 25 && fteElect < 150 ? fteElect * 10 : fteElect > 150 ? fteElect * 4 : 0;
  const Red_Fixes = 700;
  const totalPayableAmount = Number(totalPrice) + (Number(totalPrice) * 0.20) + fteElect + contributionCL + contributionRTT + Red_Fixes;
  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    const invoiceTitle = 'Facture';
    const invoiceDate = new Date().toLocaleDateString();
  
    // Adding the logo
    const imgWidth = 40;
    const imgHeight = 30;
    const imgMarginRight = 10;
    doc.addImage(energyFlowLogo, 'PNG', doc.internal.pageSize.getWidth() - imgWidth - imgMarginRight, 10, imgWidth, imgHeight);
  
    // Setting up fonts and sizes
    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(16);
    doc.setTextColor(60);
  
    // Centering the title
    const pageWidth = doc.internal.pageSize.getWidth();
    const titleX = (pageWidth - doc.getTextWidth(invoiceTitle)) / 2;
    doc.text(invoiceTitle, titleX, 20);
  
    // Adding invoice details
    doc.setFontSize(12);
    doc.text(`Numéro de Facture: ${invoiceNumber}`, 15, 30);
    doc.text(`Date: ${invoiceDate}`, 15, 40);
    doc.text(`Client: ${clientName}`, 15, 50);
  
    // Preparing table data
    const tableRows = [
      ['Micro-ondes', `${Number(en1Data)?.toFixed(2) ?? '0'} kWh`,'Réfrigérateur', `${Number(en2Data)?.toFixed(2) ?? '0'} kWh`],
      
      ['Ventilateur', `${Number(1.17)?.toFixed(2) ?? '0'} kWh`,'Télévision', `${Number(en2Data)?.toFixed(2) ?? '0'} kWh`],
      
      ['Climatiseur', `${Number(en1Data)?.toFixed(2) ?? '0'} kWh`,'Four électrique', `${Number(en2Data)?.toFixed(2) ?? '0'} kWh`],
     
      ['Chaudiére', `${Number(en1Data)?.toFixed(2) ?? '0'} kWh`,"Machine à laver", `${Number(en2Data)?.toFixed(2) ?? '0'} kWh`],
     
      ['Eclairage', `${Number(en2Data)?.toFixed(2) ?? '0'} kWh`],

    ];
  
    // Adding the table
    doc.autoTable({
      startY: 65,
      margin: { top: 10 },
      headStyles: { fillColor: "black", textColor: 255, fontSize: 12 },
      bodyStyles: { fontSize: 10 },
      alternateRowStyles: { fillColor: [240, 240, 240] },
      head: [['Libéllés', 'Consommation','Libéllés', 'Consommation']],
      body: tableRows,
      theme: 'grid',
      didDrawPage: (data) => {
        const headerHeight = doc.internal.pageSize.height - 30;
        doc.setFontSize(8);
        doc.setTextColor(40);
        doc.text('Page ' + (data.pageNumber || 1) + ' of ' + (data.pages ? data.pages.length : '1'), data.settings.margin.left, headerHeight - 22);
      }
    });
  
    // Calculating positions
    let finalY = doc.lastAutoTable.finalY + 10;
    let totalPriceFormatted = Number(totalPrice)?.toFixed(2) ?? 'N/A';
  
    // Adding additional invoice details
    doc.setFontSize(12);
    doc.setTextColor(60);
    doc.text(`Montant Hors taxes: ${480.64} Millimes`, 15, finalY);
    doc.text(`TVA (20%): ${(Number(totalPrice) ? (Number(totalPrice) * 0.20).toFixed(2) : '96.13')} Millimes`, 15, finalY + 10);
    doc.text(`Contribution CL: ${5.85} Millimes`, 15, finalY + 20);
    doc.text(`FTE(Elect): ${1.17} Millimes`, 15, finalY + 30);
    doc.text(`Contribution RTT: ${contributionRTT.toFixed(2)} Millimes`, 15, finalY + 40);
    doc.text(`Red.Fixes: ${Red_Fixes} Millimes`, 15, finalY + 50);
  
    // Highlighting the total payable amount
    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(14);
    
    doc.text(`Total à Payer: ${1283.97} Millimes`, 15, finalY + 70);
  
    const signatureWidth = 50;  // Adjust as needed
    const signatureHeight = 25; // Adjust as needed
    const signatureX = pageWidth - signatureWidth - 15; // Right-align the signature
    const signatureY = finalY + 80;
    doc.addImage('/img/images/signature.jpg', 'JPG', signatureX, signatureY, signatureWidth, signatureHeight);
  
    // Save the PDF
    doc.save('facture.pdf');
  };
  return (
    <div onClick={handleDownloadPDF} style={{ cursor: 'pointer' }}>
      <Lottie options={defaultOptions} height={200} width={200} />
    </div>
  );
};

export default DownloadButton;
