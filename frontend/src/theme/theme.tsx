import React from 'react';

import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { indigo } from '@mui/material/colors';

type ThemeProps = {
  children: React.ReactNode;
};

declare module '@mui/material/styles' {
  interface BreakpointOverrides {
    ss: true;
    big: true;
  }
}

declare module '@mui/material/styles' {
  interface Palette {
    typography: Palette['primary'];
  }

  interface PaletteOptions {
    typography?: PaletteOptions['primary'];
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    gradient: true;
  }
}

export const ThemeModeProvider = ({ children }: ThemeProps) => {
  const theme = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: indigo[200],
      },
      secondary: {
        main: '#eda7f1',
      },
      typography: {
        main: '#b3b3b3',
        contrastText: indigo[200],
      },
      background: {
        default: '#0d0d0d',
        paper: '#0e0e0e',
      },
      text: {
        secondary: '#b3b3b3',
      },
    },

    typography: {
      fontFamily: "'Inter', sans-serif",
    },
    shape: {
      borderRadius: 10,
    },

    components: {
      MuiContainer: {
        defaultProps: {
          component: 'section',
          maxWidth: 'lg',
        },
      },
      MuiTypography: {
        defaultProps: {
          component: 'p',
        },
      },
      MuiButton: {
        defaultProps: {
          variant: 'contained',
        },
        variants: [
          {
            props: { variant: 'gradient' },
            style: ({ theme }) => ({
              backgroundImage: `linear-gradient(to right, ${theme.palette.primary.main} 0%, #eda7f1  51%, ${theme.palette.primary.main}  100%)`,
              transition: '0.5s',
              backgroundSize: '200% auto',
              ':hover': {
                backgroundPosition: 'right center',
              },
            }),
          },
        ],
        styleOverrides: {
          root: {
            textTransform: 'none',
            padding: '4px 8px',
          },
        },
      },
      MuiModal: {
        styleOverrides: {
          backdrop: {
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            backdropFilter: 'blur(5px)',
          },
        },
      },
    },

    breakpoints: {
      values: {
        xs: 0,
        ss: 500,
        sm: 600,
        big: 700,
        md: 900,
        lg: 1200,
        xl: 1536,
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};
