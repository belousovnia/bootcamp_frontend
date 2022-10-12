import { createTheme, responsiveFontSizes, ThemeProvider } from '@mui/material/styles';
import { ReactNode } from 'react';

let theme = createTheme({
  palette: {
    mode: 'light',
    background: {
      paper: '#fff',
      default: '#f5f5f5',
    },
    primary: {
      main: '#007C5C',
      light: '#338771',
      dark: '#004936',
    },
    secondary: {
      main: '#335F70',
    },
  },
  shape: {
    borderRadius: 14,
  },
  typography: {
    fontFamily:
      "'Inter Tight', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'",
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 700,
    },
    h3: {
      fontWeight: 700,
    },
    h4: {
      fontWeight: 700,
    },
    h5: {
      fontWeight: 700,
    },
    h6: {
      fontWeight: 700,
    },
  },
});

theme = responsiveFontSizes(theme);

export const AppThemeProvider = ({ children }: { children: ReactNode }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};
