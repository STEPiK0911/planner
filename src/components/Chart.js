import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { fetchRouteData } from '../services/api';
import Loader from './Loader';

const Chart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [numPoints, setNumPoints] = useState(100);

  useEffect(() => {
    const getData = async () => {
      const response = await fetchRouteData(numPoints);
      console.log('Data fetched:', response);
      setData(response);
      setLoading(false);
    };
    getData();
  }, [numPoints]);

  const handleInputChange = (event) => {
    setNumPoints(Number(event.target.value));
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div>
      <input
        type="number"
        value={numPoints}
        onChange={handleInputChange}
        min="0"
        max="1000"
        style={{ marginBottom: '20px' }}
      />
      <LineChart width={800} height={400} data={data}>
        <XAxis dataKey="id" />
        <YAxis dataKey="height" />
        <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
        <Tooltip />
        <Line type="monotone" dataKey="height" stroke="#8884d8" />
      </LineChart>
    </div>
  );
};

export default Chart;
