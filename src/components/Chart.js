import React, { useEffect, useState } from 'react';
import D3Chart from './D3Chart';
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

  return <D3Chart data={data} />;
};

export default Chart;
