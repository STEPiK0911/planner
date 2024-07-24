import React from 'react';
import D3Chart from './components/D3Chart';
import { Container, CssBaseline } from '@mui/material';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  },
});

const App = () => {
  const classes = useStyles();
  return (
    <Container className={classes.root}>
      <CssBaseline />
      <D3Chart />
    </Container>
  );
};

export default App;
