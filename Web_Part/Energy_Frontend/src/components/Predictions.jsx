import React, { useState, useEffect } from 'react';
import Layout from '../layouts/Layout';

const Prediction = () => {
  // Simulated data for the predictions (replace with your API data)
  const [predictions24h, setPredictions24h] = useState([]);
  const [predictions7d, setPredictions7d] = useState([]);
  const [predictions30d, setPredictions30d] = useState([]);

  useEffect(() => {
    // Simulated prediction data fetching
    setPredictions24h([
      { hour: 0, predicted_energy_kWh: 0.05 },
      { hour: 1, predicted_energy_kWh: 0.06 },
      { hour: 2, predicted_energy_kWh: 0.07 },
      { hour: 3, predicted_energy_kWh: 0.06 },
      { hour: 4, predicted_energy_kWh: 0.05 },
      // Add more hours...
    ]);

    setPredictions7d([
      { day: 1, predicted_energy_kWh: 2.3 },
      { day: 2, predicted_energy_kWh: 2.5 },
      { day: 3, predicted_energy_kWh: 2.4 },
      { day: 4, predicted_energy_kWh: 2.6 },
      { day: 5, predicted_energy_kWh: 2.8 },
      { day: 6, predicted_energy_kWh: 3.0 },
      { day: 7, predicted_energy_kWh: 2.9 },
    ]);

    setPredictions30d([
      { day: 1, predicted_energy_kWh: 3.5 },
      { day: 2, predicted_energy_kWh: 3.6 },
      { day: 3, predicted_energy_kWh: 3.7 },
      { day: 4, predicted_energy_kWh: 3.8 },
      { day: 5, predicted_energy_kWh: 3.9 },
      // Add more days...
    ]);
  }, []);

  return (
    <Layout header={1} footer={1}>

    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h2>Prédictions de Consommation d'Énergie</h2>
      <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap' }}>
        {/* Prédictions 24h */}
        <div style={{ border: '1px solid #ccc', padding: '20px', margin: '10px', width: '30%', minWidth: '280px' }}>
          <h3>Prédictions pour les 24 prochaines heures</h3>
          {predictions24h.map((prediction) => (
            <p key={prediction.hour}>
              Heure {prediction.hour}: {prediction.predicted_energy_kWh} kWh
            </p>
          ))}
        </div>

        {/* Prédictions 7 jours */}
        <div style={{ border: '1px solid #ccc', padding: '20px', margin: '10px', width: '30%', minWidth: '280px' }}>
          <h3>Prédictions pour les 7 prochains jours</h3>
          {predictions7d.map((prediction) => (
            <p key={prediction.day}>
              Jour {prediction.day}: {prediction.predicted_energy_kWh} kWh
            </p>
          ))}
        </div>

        {/* Prédictions 30 jours */}
        <div style={{ border: '1px solid #ccc', padding: '20px', margin: '10px', width: '30%', minWidth: '280px' }}>
          <h3>Prédictions pour le mois suivant</h3>
          {predictions30d.map((prediction) => (
            <p key={prediction.day}>
              Jour {prediction.day}: {prediction.predicted_energy_kWh} kWh
            </p>
          ))}
        </div>
      </div>
    </div>
    </Layout>

  );
};

export default Prediction;
