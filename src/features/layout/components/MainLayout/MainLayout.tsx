import { Container } from '@mui/material';
import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './Header';

export const MainLayout = () => {
  return (
    <>
      <Header />
      <main>
        <Container sx={{ pt: 5, pb: 3 }}>
          <Outlet />
        </Container>
      </main>
      <footer></footer>
    </>
  );
};
