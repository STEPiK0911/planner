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
    height: Math.floor(Math.random() * 1000),
    distance: index * 10,
    surface: ['SAND', 'ASPHALT', 'GROUND'][index % 3],
    maxSpeed: ['FAST', 'NORMAL', 'SLOW'][index % 3],
  }));
  return data;
};
