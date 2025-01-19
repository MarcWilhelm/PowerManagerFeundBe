import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';


import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({

    palette: {
        mode: "dark",
        primary: {
            main: '#E5E619',
        },
        secondary: {
            main: '#e0f2f1',
        },
    },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <ThemeProvider theme={theme}>
    <App />
      </ThemeProvider>
  </React.StrictMode>
);

