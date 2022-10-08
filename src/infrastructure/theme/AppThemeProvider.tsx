import { createTheme, ThemeProvider } from '@mui/material/styles';
import { ReactNode } from 'react';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#00694e',
      light: '#338771',
      dark: '#004936',
    },
    secondary: {
      main: '#f50057',
    },
  },
  shape: {
    borderRadius: 14,
  },
});

export const AppThemeProvider = ({ children }: { children: ReactNode }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};
