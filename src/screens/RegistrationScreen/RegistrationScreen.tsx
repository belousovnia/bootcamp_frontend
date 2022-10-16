import React from 'react';
import { Registration } from '@features/auth';
import { Helmet } from 'react-helmet';
import { APP_TITLE_WITH_SEPARATOR } from '@utils/constants';

export const RegistrationScreen = () => {
  return (
    <>
      <Helmet>
        <title>Регистрация {APP_TITLE_WITH_SEPARATOR}</title>
      </Helmet>
      <Registration />
    </>
  );
};
