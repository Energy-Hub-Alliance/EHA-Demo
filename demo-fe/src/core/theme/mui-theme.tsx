// ---------------------------------------- IMPORTS ---------------------------------------- //
import {
  CssBaseline,
  StyledEngineProvider,
  ThemeProvider,
} from '@mui/material';

import {
  CustomThemeOptions,
  CustomTheme,
  createTheme,
  alpha,
  darken,
} from '@mui/material/styles';

// ---------------------------------------- FONTS ---------------------------------------- //
//Exo
import '@fontsource/exo/400.css'; // Regular
import '@fontsource/exo/500.css'; // Medium
import '@fontsource/exo/700.css'; // Bold
import '@fontsource/exo/900.css'; // Black

//Roboto -- Default MUI
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

// ---------------------------------------- TYPES & INTERFACES ---------------------------------------- //
interface ThemeProviderProps {
  children: React.ReactNode;
}

// ---------------------------------------- CONSTANTS ---------------------------------------- //
const PRIMARY = '#871FFF';
const SECONDARY = '#00FF7F';
const BACKGROUND = '#090113';
const PAPER = '#200242';
const WHITE = '#FFFFFF';

const FONT_FAMILY = 'Exo, Roboto, Arial, sans-serif';

// ---------------------------------------- THEME ---------------------------------------- //

const themeOptions: CustomThemeOptions = {
  palette: {
    mode: 'dark',
    primary: {
      main: PRIMARY,
      contrastText: WHITE,
    },
    secondary: {
      main: SECONDARY,
      contrastText: '#090113',
    },
    error: {
      main: '#E80000',
      contrastText: WHITE,
    },
    success: {
      main: '#2AD87D',
      contrastText: '#090113',
    },
    background: {
      default: BACKGROUND,
      paper: PAPER,
    },
    text: {
      primary: WHITE,
      secondary: alpha(WHITE, 0.7),
    },
    common: {
      black: PAPER,
      white: WHITE,
      statuses: {
        CHARGING: SECONDARY,
        DISCHARGING: '#91C3FD',
        PRODUCING: SECONDARY,
        IDLE: '#AA8FC1',
        FAULT: '#E80000',
        FINISHED: '#2AD87D',
        PLUGGED: '#FFC240',
        PREPARING: '#C3FCF1',
        UNKNOWN: '#9CB0C9',
        UNPLUGGED: '#AA8FC1',
        STOPPED: '#91C3FD',
      },
      horizontal_separator: `linear-gradient(90deg, ${PAPER} 20%, ${PRIMARY} 37.5%, ${SECONDARY} 65%, #4E05A3 90%)`,
      vertical_separator: `linear-gradient(180deg, ${alpha(
        SECONDARY,
        0.5
      )}  0%, ${alpha(PRIMARY, 0.5)}  100%);`,
    },
  },
  ui_vars: {
    font_size: {
      xs: '1rem',
      s: '1.4rem',
      m: '1.6rem',
      l: '2rem',
      xl: '2.4rem',
      xxl: '3.4rem',
    },

    other: {
      page_spacing: '2rem',
      header_height: '8rem',
      footer_height: '8rem',
    },
  },
  spacing: 4,
  typography: {
    htmlFontSize: 10,
    fontFamily: FONT_FAMILY,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontSize: '1.6rem',
          fontWeight: 500,
          lineHeight: '2rem',
          padding: '1.2rem 2.4rem',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          background: `linear-gradient(138deg, #28094D 1.5%, #15042a 30%, ${BACKGROUND} 70%)`,
          boxShadow: `0px 4px 6px 0px ${alpha(PRIMARY, 0.2)}`,
          overflow: 'initial',
          borderRadius: '12px',
          padding: '1.6rem',

          position: 'relative',
          '&::before': {
            position: 'absolute',
            content: `""`,
            pointerEvents: 'none',
            padding: '2px',
            inset: 0,
            background: `linear-gradient(25deg, ${PAPER} 0%, ${PRIMARY} 20%, ${SECONDARY} 40%, ${PRIMARY} 80%, ${PAPER} 100%)`,
            opacity: 0.3,
            borderRadius: '10px',
            WebkitMask: `linear-gradient(#FFF 0 0) content-box, 
     linear-gradient(#FFF 0 0)`,
            WebkitMaskComposite: 'xor',
            maskComposite: 'exclude',
          },
        },
      },
    },
    MuiFab: {
      styleOverrides: {
        root: {
          background: PAPER,
          color: WHITE,

          '&:hover': {
            background: darken(PAPER, 0.15),
          },
        },
        sizeSmall: {
          minWidth: 30,
          width: 30,
          minHeight: 30,
          height: 30,
        },
      },
    },
    MuiSnackbarContent: {
      styleOverrides: {
        root: {
          flexWrap: 'nowrap',
        },
      },
    },
  },
};

const muiTheme: CustomTheme = createTheme(themeOptions);

// ---------------------------------------- THEME PROVIDER ---------------------------------------- //
export const AppThemeProvider = ({ children }: ThemeProviderProps) => {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={muiTheme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </StyledEngineProvider>
  );
};
