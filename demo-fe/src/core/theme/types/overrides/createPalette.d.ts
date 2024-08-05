// eslint-disable-next-line
import * as createPalette from '@mui/material/styles/createPalette';

declare module '@mui/material/styles/createPalette' {
  interface CustomCommonColors extends CommonColors {
    statuses: {
      CHARGING: string;
      FAULT: string;
      FINISHED: string;
      PLUGGED: string;
      PREPARING: string;
      UNKNOWN: string;
      UNPLUGGED: string;
      STOPPED: string;
    };
    horizontal_separator: string;
    vertical_separator: string;
  }

  export interface CustomPaletteOptions extends PaletteOptions {
    primary: SimplePaletteColorOptions;
    secondary: SimplePaletteColorOptions;
    error: SimplePaletteColorOptions;
    warning?: SimplePaletteColorOptions;
    info?: SimplePaletteColorOptions;
    success?: SimplePaletteColorOptions;
    common: CustomCommonColors;
  }

  export interface CustomPalette extends Palette {
    primary: SimplePaletteColorOptions;
    secondary: SimplePaletteColorOptions;
    error: SimplePaletteColorOptions;
    warning: SimplePaletteColorOptions;
    info: SimplePaletteColorOptions;
    success: SimplePaletteColorOptions;
    common: CustomCommonColors;
  }
}
