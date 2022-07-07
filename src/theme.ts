import { createTheme } from '@mui/material';

const { palette } = createTheme();
const { augmentColor } = palette;

const createColor = (mainColor: string) => augmentColor({ color: { main: mainColor } });

const theme = createTheme({
  typography: {
    h1: {
      fontFamily: 'Circular Std Bold, sans-serif',
      fontSize: '2.5rem',
      color: '#141414',
    },
    h2: {
      fontFamily: 'Lato, sans-serif',
      fontSize: '6rem',
      color: '#141414',
    },
    body1: {
      fontFamily: 'Lato, sans-serif',
      fontSize: '2rem',
      lineHeight: '4rem',
    },
    body2: {
      fontFamily: 'Inter, sans-serif',
      fontSize: '1.75rem',
      lineHeight: '4rem',
    },
    overline: {
      fontFamily: 'Inter, sans-serif',
      fontWeight: 500,
      fontSize: '1.5rem',
      lineHeight: '2rem',
    },
  },
  palette: {
    primary: createColor('#212121'),
    secondary: createColor('#fff'),
    info: createColor('#212121'),
    success: createColor('#353535'),
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '0',
        },
      },
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1440,
    },
  },
});

export default theme;
