import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Area, Scatter } from 'recharts';
import { fetchRouteData } from '../services/api';
import Loader from './Loader';

const getColorBySurface = (surface) => {
  switch (surface) {
    case 'SAND': return '#FFD700';
    case 'ASPHALT': return '#808080';
    case 'GROUND': return '#8B4513';
    default: return '#000000';
  }
};

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const { name, height, distance, surface, maxSpeed } = payload[0].payload;
    return (
      <div className="custom-tooltip" style={{ backgroundColor: 'white', border: '1px solid #ccc', padding: '10px' }}>
        <p><strong>{name}</strong></p>
        <p>Height: {height}</p>
        <p>Distance: {distance}</p>
        <p>Surface: {surface}</p>
        <p>Max Speed: {maxSpeed}</p>
      </div>
    );
  }
  return null;
};

const Chart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      const response = await fetchRouteData();
      console.log('Data fetched:', response);
      setData(response);
      setLoading(false);
    };
    getData();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <LineChart width={800} height={400} data={data}>
      <XAxis dataKey="distance" />
      <YAxis dataKey="height" />
      <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
      <Tooltip content={<CustomTooltip />} />
      <Line type="monotone" dataKey="height" stroke="#8884d8" />
      <Scatter data={data} fill="#8884d8" />
      {data.map((entry, index) => (
        <Area
          key={index}
          type="monotone"
          dataKey="height"
          fill={getColorBySurface(entry.surface)}
          stroke={getColorBySurface(entry.surface)}
          fillOpacity={0.3}
          activeDot={{ r: 8 }}
        />
      ))}
    </LineChart>
  );
};

export default Chart;
