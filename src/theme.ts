import { createTheme } from '@mui/material';

const { palette } = createTheme();
const { augmentColor } = palette;

const createColor = (mainColor: string) => augmentColor({ color: { main: mainColor } });

const theme = createTheme({
  typography: {
    h1: {
      fontFamily: 'Circular Std Bold',
      fontSize: '2.5rem',
    },
    body2: {
      fontFamily: 'Lato, sans-serif',
      fontSize: '1.5rem',
      lineHeight: '2remm',
    },
  },
  palette: {
    primary: createColor('#000'),
    secondary: createColor('#fff'),
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
});

export default theme;
