/* eslint-disable import/prefer-default-export */
/* eslint-disable no-unused-vars */

import { Theme, ThemeOptions } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface CustomTheme {
    status: {
      danger: string;
    }
  }

  interface CustomThemeOptions {
    status?: {
      danger?: string
    }
  }

  export function createTheme(options?: CustomThemeOptions): CustomTheme;
}
