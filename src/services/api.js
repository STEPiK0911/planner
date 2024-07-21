import axios from 'axios';

const API_URL = 'http://localhost:8080';

export const fetchRouteDataFromServer = async () => {
  try {
    const response = await axios.get(`${API_URL}/Route`);
    return response.data;
  } catch (error) {
    console.error('Error fetching route data:', error);
    return [];
  }
};

export const fetchRouteData = async (numPoints = 100) => {
  const data = Array.from({ length: numPoints }, (_, index) => ({
    id: index + 1,
    name: `Point ${index + 1}`,
    distance: index,
    height: Math.floor(Math.random() * 1000),
    speed: ['FAST', 'NORMAL', 'SLOW'][Math.floor(Math.random() * 3)],
    surface: ['SAND', 'ASPHALT', 'GROUND'][Math.floor(Math.random() * 3)],
  }));
  return data;
};
