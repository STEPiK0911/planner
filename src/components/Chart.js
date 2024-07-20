import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { fetchRouteData } from '../services/api';
import Loader from './Loader';

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
      <Tooltip />
      <Line type="monotone" dataKey="height" stroke="#8884d8" />
    </LineChart>
  );
};

export default Chart;
