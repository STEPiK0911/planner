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
  const surfaces = ['GRASS', 'SAND', 'GRAVEL']; // Зелёный, жёлтый, фиолетовый
  const data = Array.from({ length: numPoints }, (_, index) => ({
    id: index + 1,
    name: `Point ${index + 1}`,
    height: Math.floor(Math.random() * 1000),
    distance: index * 10,
    surface: surfaces[Math.floor(Math.random() * surfaces.length)], // случайный выбор поверхности
    maxSpeed: ['FAST', 'NORMAL', 'SLOW'][Math.floor(Math.random() * 3)], // случайный выбор скорости
  }));
  return data;
};

export default fetchRouteData;
