import { queryClient } from '@infrastructure/query-client';
import Routing from '@infrastructure/routing/routing';
import { AppThemeProvider } from '@infrastructure/theme';
import { QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '@features/auth/components/AuthProvider';

export const App = () => {
  return (
    <React.StrictMode>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <AppThemeProvider>
              <Routing />
            </AppThemeProvider>
          </BrowserRouter>
        </QueryClientProvider>
      </AuthProvider>
    </React.StrictMode>
  );
};
