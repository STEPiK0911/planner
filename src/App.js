import React, { useState } from 'react';
import D3Chart from './components/D3Chart';
import { Container, CssBaseline, Box, Typography, Slider } from '@mui/material';

const App = () => {
  const [numPoints, setNumPoints] = useState(100);

  const handleSliderChange = (event, newValue) => {
    setNumPoints(newValue);
  };

  return (
    <Container>
      <CssBaseline />
      <Box display="flex" flexDirection="row">
        <Box flexGrow={1}>
          <D3Chart numPoints={numPoints} />
        </Box>
        <Box width={200} padding={2}>
          <Typography id="num-points-slider" gutterBottom>
            Number of Points
          </Typography>
          <Slider
            value={numPoints}
            onChange={handleSliderChange}
            aria-labelledby="num-points-slider"
            valueLabelDisplay="auto"
            step={1}
            min={1}
            max={1000}
          />
          <Typography>{numPoints} points</Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default App;
