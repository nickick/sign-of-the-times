/* eslint-disable no-unused-vars */
import '@mui/material/styles';

declare module '@mui/material/styles/createPalette' {
  interface Palette {
    textBlack: string;
  }

  interface PaletteOptions {
    textBlack?: string
  }
}
