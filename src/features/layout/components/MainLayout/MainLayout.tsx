import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { Header } from './Header';

export const MainLayout = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <footer></footer>
    </>
  );
};
