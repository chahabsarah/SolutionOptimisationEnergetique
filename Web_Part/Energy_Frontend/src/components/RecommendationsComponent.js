import React, { useEffect, useState } from 'react';

const RecommendationsComponent = () => {
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/api/recommendations', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          }
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch recommendations');
        }

        const data = await response.json();
        // Limiter les recommandations aux 2 premières phrases
        setRecommendations(data.slice(0, 2));
      } catch (error) {
        console.error('Failed to fetch recommendations:', error);
      }
    };

    fetchRecommendations();
  }, []);

  return (
    <div style={{display:'flex'}}>
      
      <div>{recommendations.map((recommendation, index) => (
        <p key={index} style={{ fontSize: '16px', color: 'blue' }}>{recommendation}</p>
      ))} </div>
      <img src='../img/images/IA.jpg' width={50} height={100}></img>
    </div>
  );
};

export default RecommendationsComponent;
