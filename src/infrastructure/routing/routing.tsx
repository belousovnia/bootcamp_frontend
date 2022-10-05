import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { Layout } from '../../features/layout/Layout';
import { Main } from '../../screens/Main/Main';
import { Test } from '../../screens/Test/Test';

export const Routing = () => {
  return (
    <>
      <Routes>
        <Route path={'/'} element={<Layout />}>
          <Route index element={<Main />} />
          <Route path={'test'} element={<Test />} />
        </Route>
      </Routes>
    </>
  );
};

export default Routing;
