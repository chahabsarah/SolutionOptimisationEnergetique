import React, { useEffect, useState } from 'react';
import GaugeChart from 'react-gauge-chart';
import { fetchData } from '../api';

const fieldRanges = {
    voltage: [0, 240],
    current: [0, 100],
    frequency: [0, 90],
    temperatureC: [-85, 150],
    energy: [0, 100000000000],
    power :[0,10000],
    pf:[0,1]
};

const fieldNames = {
    voltage: 'Tension',
    current: 'Courant',
    frequency: 'Fréquence',
    temperatureC: 'Temperature',
    energy: 'Energie',
    power:"Puissance",
    pf:"Facteur de puissance",
};

const gaugeColors = {
    voltage: ['#93D94E', '#347355'], // Green to Red
    current: ['#0FC2C0', '#0000FF'], // Blue to Magenta
    frequency: ['#FFFF00', '#FF4500'], // Yellow to Orange
    temperatureC: ['#00FF00', '#FF0000'], // Green to Red
    energy: ['#6495ED', '#8B0000'] // CornflowerBlue to DarkRed
};

const needleColors = {
    voltage: 'green',
    current: 'blue',
    frequency: 'red',
    temperatureC: 'black',
    energy: 'purple'
};

const GaugeChartComponent = ({ sensor, field }) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    useEffect(() => {
        const getData = async () => {
            try {
                const fetchedData = await fetchData(sensor, field);
                console.log(`Données récupérées pour ${field}:`, fetchedData);
                if (Array.isArray(fetchedData) && fetchedData.length > 0) {
                    setData(fetchedData[fetchedData.length - 1]._value);
                } else {
                    console.error(`Aucune donnée valide trouvée pour le champ : ${field}`);
                }
            } catch (err) {
                setError(err);
            }
        };
    
        if (sensor && field) {
            getData();
        }
    
    }, [sensor, field]);
    
    

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    if (data === null) {
        return <div>Loading...</div>;
    }

    const [min, max] = fieldRanges[field];
    const percent = (data - min) / (max - min);

    return (
        <div style={{ position: 'relative'}}>
            <GaugeChart
                id={`${sensor}-${field}-gauge`}
                nrOfLevels={10}
                percent={percent}
                colors={gaugeColors[field]}
                arcPadding={0.02}
                needleColor={needleColors[field]}
                hideText
            />
            <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                fontSize: '1.5em',
                fontWeight: 'bold'
            }}>
                {data} {field === 'voltage' ? 'V' : field === 'current' ? 'A' : field === 'frequency' ? 'Hz' : field === 'temperatureC' ? 'C°': field === 'energy' ? 'KWH': ''}
            </div>
            <h3 style={{ textAlign: 'center', marginTop: '10px', color: 'grey' }}>{fieldNames[field]}</h3>
        </div>
    );
};

export default GaugeChartComponent;
