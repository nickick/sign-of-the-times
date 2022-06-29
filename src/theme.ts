import { createTheme } from '@mui/material';

const theme = createTheme({
  typography: {
    h1: {
      fontFamily: 'Circular Std Bold',
      fontSize: '2.5rem',
    },
    body1: {
      fontFamily: 'Freight, serif',
      fontSize: '3.125rem',
    },
  },
});

export default theme;
