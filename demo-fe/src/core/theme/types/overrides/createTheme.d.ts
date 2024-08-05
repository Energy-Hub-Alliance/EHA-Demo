// eslint-disable-next-line
import * as createTheme from '@mui/material/styles';
import { CustomPaletteOptions } from '@mui/material/styles/createPalette';
import { Theme, ThemeOptions } from '@mui/material/styles';

declare module '@mui/material/styles' {
  export interface CustomThemeOptions extends ThemeOptions {
    palette: CustomPaletteOptions;
    ui_vars: {
      font_size: {
        xs: string;
        s: string;
        m: string;
        l: string;
        xl: string;
        xxl: string;
      };
      other: {
        page_spacing: string;
        header_height: string;
        footer_height: string;
      };
    };
  }

  export interface CustomTheme extends Theme {
    palette: CustomPaletteOptions;
    ui_vars: {
      font_size: {
        xs: string;
        s: string;
        m: string;
        l: string;
        xl: string;
        xxl: string;
      };
      other: {
        page_spacing: string;
        header_height: string;
        footer_height: string;
      };
    };
  }

  export function createTheme(
    options?: CustomThemeOptions,
    ...args: object[]
  ): CustomTheme;

  export function useTheme<T = CustomTheme>(): T;
}
