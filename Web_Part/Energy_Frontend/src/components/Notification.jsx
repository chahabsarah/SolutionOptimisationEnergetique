import React, { useState, useEffect } from 'react';
import './Notification.css'; // Ajoutez vos styles ici
import axios from 'axios';

const Notification = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [readNotifications, setReadNotifications] = useState([]);

  useEffect(() => {
    fetchNotifications();
    fetchRecommendations();
    fetchAlerts();
  }, []);

  const fetchNotifications = async () => {
    try {
      const response = await axios.get('http://localhost:5001/api/inefficiencies');
      setNotifications(response.data || []); // Assurez-vous que c'est un tableau
    } catch (error) {
      console.error('Erreur lors de la récupération des notifications:', error);
    }
  };

  const fetchRecommendations = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:5001/api/recommendations');
      setRecommendations(response.data || []); // Assurez-vous que c'est un tableau
    } catch (error) {
      console.error('Erreur lors de la récupération des recommandations:', error);
    }
  };

  const fetchAlerts = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:5001/api/alerts');
      setAlerts(response.data || []); // Assurez-vous que c'est un tableau
    } catch (error) {
      console.error('Erreur lors de la récupération des alertes:', error);
    }
  };

  const markAsRead = (id) => {
    setReadNotifications([...readNotifications, id]);
  };

  const toggleNotifications = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="notification-wrapper">
      <img
        src='./img/images/notification.png'
        alt='Notifications'
        style={{ width: "20px", height: '20px', marginTop: '30px', cursor: 'pointer' }}
        onClick={toggleNotifications}
      />
      {isOpen && (
        <div className="notification-dropdown">
          <div className="notifications-section">
            <ul className='notif'>
              {notifications.length === 0 ? (
                <li>Aucune notification disponible</li>
              ) : (
                notifications.map((notif, index) => (
                <li key={index}>   <img src='./img/images/fleche-droite.png' style={{width:'20px'}}></img> {' '}{notif}  !!</li>
                ))
              )}
            </ul>
          </div>
          <div className="recommendations-section">
            <ul className=' rec'>
              {recommendations.length === 0 ? (
                <li>Aucune recommandation disponible</li>
              ) : (
                recommendations.map((rec, index) => (
                  <li key={index}> <img src='./img/images/abn.png' style={{width:'20px'}}></img> {' '}{rec} </li>
                ))
              )}
            </ul>
          </div>
          <div className="alerts-section">
            <ul className='aler'>
              {alerts.length === 0 ? (
                <li>Aucune alerte disponible</li>
              ) : (
                alerts.map((alert, index) => (
                  <li key={index}> <img src='./img/images/fleche-droite.png' style={{width:'20px'}}></img> {' '}{alert.message} !! </li>
                ))
              )}
            </ul>
          </div>
        </div>
      )}
      
    </div>
  );
};

export default Notification;
