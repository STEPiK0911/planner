import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Scatter } from 'recharts';
import { fetchRouteData } from '../services/api';
import Loader from './Loader';

const getLineColor = (speed) => {
  switch (speed) {
    case 'FAST':
      return 'red';
    case 'NORMAL':
      return 'orange';
    case 'SLOW':
      return 'green';
    default:
      return 'blue';
  }
};

const getSurfaceColor = (surface) => {
  switch (surface) {
    case 'SAND':
      return '#FFFF99';
    case 'ASPHALT':
      return '#B3B3B3';
    case 'GROUND':
      return '#99FF99';
    default:
      return '#FFFFFF';
  }
};

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const { name, height, distance, surface, maxSpeed } = payload[0].payload;
    return (
      <div className="custom-tooltip">
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

  const segments = data.reduce((acc, point, index) => {
    if (index === 0) return acc;
    const prevPoint = data[index - 1];
    acc.push({
      x1: prevPoint.distance,
      x2: point.distance,
      y1: prevPoint.height,
      y2: point.height,
      speed: point.maxSpeed,
      surface: point.surface,
    });
    return acc;
  }, []);

  return (
    <LineChart width={800} height={400} data={data}>
      <XAxis dataKey="distance" />
      <YAxis dataKey="height" />
      <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
      <Tooltip content={<CustomTooltip />} />
      {segments.map((segment, index) => (
        <React.Fragment key={`segment-${index}`}>
          <Scatter
            data={[{ distance: segment.x1, height: segment.y1 }]}
            fill={getLineColor(segment.speed)}
            line
          />
          <Scatter
            data={[{ distance: segment.x2, height: segment.y2 }]}
            fill={getLineColor(segment.speed)}
            line
          />
          <rect
            x={segment.x1}
            y={0}
            width={segment.x2 - segment.x1}
            height="100%"
            fill={getSurfaceColor(segment.surface)}
            opacity={0.3}
          />
        </React.Fragment>
      ))}
      <Line
        type="monotone"
        dataKey="height"
        stroke="#8884d8"
        dot={false}
        isAnimationActive={false}
      />
    </LineChart>
  );
};

export default Chart;
