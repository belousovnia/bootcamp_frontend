import React from 'react';
import { Login } from '@features/auth';
import { Helmet } from 'react-helmet';
import { APP_TITLE_WITH_SEPARATOR } from '@utils/constants';

export const LoginScreen = () => {
  return (
    <>
      <Helmet>
        <title>Войти {APP_TITLE_WITH_SEPARATOR}</title>
      </Helmet>
      <Login />
    </>
  );
};
