import { Container } from '@mui/material';
import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { Header } from './Header';

export const MainLayout = () => {
  return (
    <>
      <Header />
      <main>
        <Container sx={{ pt: 3 }}>
          <Outlet />
        </Container>
      </main>
      <footer></footer>
    </>
  );
};
