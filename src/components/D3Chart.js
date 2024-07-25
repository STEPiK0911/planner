import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { fetchRouteData } from '../services/api';
import { createUseStyles } from 'react-jss';
import { Slider, Typography, Box } from '@mui/material';

const getColorBySpeed = (speed) => {
  switch (speed) {
    case 'FAST': return 'red';
    case 'NORMAL': return 'orange';
    case 'SLOW': return 'green';
    default: return 'blue';
  }
};

const getRandomColor = () => {
  const colors = ['#99FF99', '#FFFF99', '#D9B3FF']; // зелёный, жёлтый, фиолетовый
  return colors[Math.floor(Math.random() * colors.length)];
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
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  slider: {
    width: '80%',
    marginTop: '20px',
  },
});

const D3Chart = () => {
  const classes = useStyles();
  const chartRef = useRef();
  const tooltipRef = useRef();
  const [numPoints, setNumPoints] = useState(100);

  useEffect(() => {
    const getData = async () => {
      const data = await fetchRouteData(numPoints);
      drawChart(data);
    };

    const drawChart = (data) => {
      const margin = { top: 20, right: 30, bottom: 30, left: 40 };
      const width = chartRef.current.clientWidth - margin.left - margin.right;
      const height = chartRef.current.clientHeight - margin.top - margin.bottom;

      d3.select(chartRef.current).selectAll('*').remove();

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
        .attr('fill', getRandomColor)
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
    <div className={classes.container}>
      <Box className={classes.slider}>
        <Typography id="slider" gutterBottom>
          Number of Points
        </Typography>
        <Slider
          value={numPoints}
          min={10}
          max={1000}
          onChange={(e, value) => setNumPoints(value)}
          aria-labelledby="slider"
        />
        <Typography>
          {numPoints} points
        </Typography>
      </Box>
      <svg ref={chartRef} style={{ width: '100%', height: '400px' }}></svg>
      <div ref={tooltipRef} className={classes.tooltip}></div>
    </div>
  );
};

export default D3Chart;
