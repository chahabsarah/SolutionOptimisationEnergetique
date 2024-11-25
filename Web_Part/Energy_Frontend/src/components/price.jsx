import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Price = () => {
    const [latestPrice, setLatestPrice] = useState(null);

    useEffect(() => {
        const fetchLatestPrice = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/data/Total_price/price');
                const data = response.data;
                console.log('Données récupérées:', data);

                if (data && data.length > 0) {
                    // Trouver l'entrée avec la valeur _time la plus récente
                    const latestEntry = data.reduce((latest, entry) => {
                        return new Date(entry._time) > new Date(latest._time) ? entry : latest;
                    });

                    console.log('Dernière entrée:', latestEntry._value);
                    setLatestPrice(latestEntry._value);
                } else {
                    console.log('Aucune donnée de prix disponible.');
                }
            } catch (error) {
                console.error('Erreur lors de la récupération du prix :', error);
            }
        };

        fetchLatestPrice();
    }, []);
// const latestPrice =128675;
    // Diviser le prix en chiffres individuels pour l'affichage
    // const digits = (latestPrice !== null ? `${latestPrice} Mil` : "854284 MiL").split('');
    const digits = (latestPrice !== null ? `${latestPrice} Mil` : "480.64 MiL").split('');

    return (
        <div className="lcd-container">
            {digits.map((digit, index) => (
                <div key={index} className="lcd-digit-container">
                    <div className="lcd-digit">{digit}</div>
                </div>
            ))}
            <style>{`
                .lcd-container {
                    display: flex;
                    justify-content: center;
                    background-color: transparent;
                    padding: 10px;
                    margin-top:15px;
                    margin-right:30px;
                    margin-left:30px;
                }

                .lcd-digit-container {
                    position: relative;
                    margin: 0 5px;
                }

                .lcd-digit {
                    font-family: 'Wallpoet';
                    font-size: 16px;
                    color: #F2DA63;
                    font-weight:bolder;
                    display: inline-block;
                    text-align: center;
                    width:14px;
                    height: 26px;
    box-shadow: 0 0 20px rgba(255, 255, 0, 0.5); /* Changed to yellow */
                }

                .lcd-reflection {
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    font-family: 'Courier New', Courier, monospace;
                    font-size: 20px;
                    color: #F2DA63; 
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    z-index: -1;
                    content: "8";
                }
            `}</style>
        </div>
    );
};

export default Price;
