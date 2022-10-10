import { queryClient } from '@infrastructure/query-client';
import Routing from '@infrastructure/routing/routing';
import { AppThemeProvider } from '@infrastructure/theme';
import { QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';

export const App = () => {
  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <AppThemeProvider>
            <Routing />
          </AppThemeProvider>
        </BrowserRouter>
      </QueryClientProvider>
    </React.StrictMode>
  );
};
