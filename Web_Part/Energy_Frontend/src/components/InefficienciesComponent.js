import React, { useEffect, useState } from 'react';
import axios from 'axios';

const InefficienciesComponent = () => {
  const [lastInefficiency, setLastInefficiency] = useState('');

  useEffect(() => {
    const fetchInefficiencies = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/inefficiencies'); // Mettez à jour l'URL avec votre endpoint Flask
        const inefficiencies = response.data;
        if (inefficiencies.length > 0) {
          // Extraire la partie jusqu'au mot "at"
          const trimmedInefficiency = inefficiencies[inefficiencies.length - 1].substring(0, inefficiencies[inefficiencies.length - 1].indexOf(' at'));
          setLastInefficiency(trimmedInefficiency);
        }
      } catch (error) {
        console.error('Failed to fetch inefficiencies:', error);
      }
    };

    fetchInefficiencies();
  }, []);

  return (
    <div >
        
      <p style={{ fontSize: '18px', color: 'blue' }}><img src='../img/images/hel.png' width={50}></img>{lastInefficiency} </p>
    </div>
  );
};

export default InefficienciesComponent;
