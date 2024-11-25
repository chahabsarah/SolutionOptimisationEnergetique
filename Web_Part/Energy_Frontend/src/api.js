import axios from 'axios';

export const fetchData = async (sensor, field) => {
  try {
    const url = field
      ? `http://localhost:3000/api/data/${sensor}/${field}`
      : `http://localhost:3000/api/data/${sensor}`;
    
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    throw new Error(`Erreur lors de la récupération des données pour ${field || 'le capteur'}: ${error.message}`);
  }
};
