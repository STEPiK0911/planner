import axios from 'axios';

const API_URL = 'http://localhost:5258';

export const fetchRouteData = async () => {
  try {
    const response = await axios.get(`${API_URL}/Route`);
    return response.data;
  } catch (error) {
    console.error('Error fetching route data:', error);
    return [];
  }
};