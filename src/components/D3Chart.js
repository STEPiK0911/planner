import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { fetchRouteData } from '../services/api';
import { createUseStyles } from 'react-jss';

const getColorBySpeed = (speed) => {
  switch (speed) {
    case 'FAST': return 'red';
    case 'NORMAL': return 'orange';
    case 'SLOW': return 'green';
    default: return 'blue';
  }
};

const getColorBySurface = (surface) => {
  switch (surface) {
    case 'GRASS': return '#99FF99'; // Зелёный
    case 'SAND': return '#FFFF99'; // Жёлтый
    case 'GRAVEL': return '#B3B3FF'; // Фиолетовый
    default: return '#FFFFFF';
  }
};

const useStyles = createUseStyles({
  tooltip: {
    position: 'absolute',
    background: 'white',
    border: '1px solid #ccc',
    padding: '10px',
    display: 'none',
    pointerEvents: 'none',
  },
  chartContainer: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const D3Chart = ({ numPoints }) => {
  const classes = useStyles();
  const chartRef = useRef();
  const tooltipRef = useRef();

  useEffect(() => {
    const getData = async () => {
      const data = await fetchRouteData(numPoints);
      drawChart(data);
    };

    const drawChart = (data) => {
      const margin = { top: 20, right: 30, bottom: 30, left: 40 };

      // Очистка предыдущего графика
      d3.select(chartRef.current).selectAll('*').remove();

      const svg = d3.select(chartRef.current)
        .attr('width', '100%')
        .attr('height', '100%')
        .attr('viewBox', `0 0 800 400`)
        .attr('preserveAspectRatio', 'xMidYMid meet')
        .append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);

      const width = 800 - margin.left - margin.right;
      const height = 400 - margin.top - margin.bottom;

      const x = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.distance)])
        .range([0, width]);

      const y = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.height)])
        .range([height, 0]);

      svg.append('g')
        .attr('transform', `translate(0,${height})`)
        .call(d3.axisBottom(x));

      svg.append('g')
        .call(d3.axisLeft(y));

      svg.append('g')
        .selectAll('rect')
        .data(data)
        .enter()
        .append('rect')
        .attr('x', (d, i) => (i > 0 ? x(data[i - 1].distance) : 0))
        .attr('width', (d, i) => (i > 0 ? x(d.distance) - x(data[i - 1].distance) : 0))
        .attr('y', 0)
        .attr('height', height)
        .attr('fill', d => getColorBySurface(d.surface))
        .attr('opacity', 0.3);

      const line = d3.line()
        .x(d => x(d.distance))
        .y(d => y(d.height));

      svg.append('path')
        .datum(data)
        .attr('fill', 'none')
        .attr('stroke', 'steelblue')
        .attr('stroke-width', 1.5)
        .attr('d', line);

      const tooltip = d3.select(tooltipRef.current);

      svg.selectAll('circle')
        .data(data)
        .enter()
        .append('circle')
        .attr('cx', d => x(d.distance))
        .attr('cy', d => y(d.height))
        .attr('r', 3)
        .attr('fill', d => getColorBySpeed(d.maxSpeed))
        .on('mouseover', (event, d) => {
          tooltip.html(`
            <strong>${d.name}</strong><br/>
            Height: ${d.height}<br/>
            Distance: ${d.distance}<br/>
            Surface: ${d.surface}<br/>
            Max Speed: ${d.maxSpeed}
          `)
            .style('left', `${event.pageX + 5}px`)
            .style('top', `${event.pageY - 28}px`)
            .style('display', 'block');
        })
        .on('mouseout', () => {
          tooltip.style('display', 'none');
        });
    };

    getData();
  }, [numPoints]);

  return (
    <div className={classes.chartContainer}>
      <svg ref={chartRef}></svg>
      <div ref={tooltipRef} className={classes.tooltip}></div>
    </div>
  );
};

export default D3Chart;
