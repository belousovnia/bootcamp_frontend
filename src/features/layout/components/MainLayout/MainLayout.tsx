import React from 'react';
import { Link, Outlet } from 'react-router-dom';

export const MainLayout = () => {
  return (
    <>
      <header>
        <Link to={'/'}>Главная</Link>
        <Link to={'/test'}>Тест</Link>
      </header>
      <main>
        <Outlet />
      </main>
      <footer></footer>
    </>
  );
};
