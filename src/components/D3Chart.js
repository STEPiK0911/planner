import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

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
      return '#D9B3FF';
    default:
      return '#FFFFFF';
  }
};

const D3Chart = ({ data }) => {
  const chartRef = useRef();

  useEffect(() => {
    const margin = { top: 20, right: 30, bottom: 30, left: 40 };
    const width = 800 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const svg = d3.select(chartRef.current)
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const x = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.distance)])
      .range([0, width]);

    const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.height)])
      .range([height, 0]);

    const line = d3.line()
      .x(d => x(d.distance))
      .y(d => y(d.height));

    const area = svg.append('g')
      .selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
      .attr('x', d => x(d.distance))
      .attr('width', width / data.length)
      .attr('y', 0)
      .attr('height', height)
      .attr('fill', d => getSurfaceColor(d.surface));

    svg.append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', d => getLineColor(d.speed))
      .attr('stroke-width', 1.5)
      .attr('d', line);

    svg.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x));

    svg.append('g')
      .call(d3.axisLeft(y));
  }, [data]);

  return (
    <svg ref={chartRef}></svg>
  );
};

export default D3Chart;
