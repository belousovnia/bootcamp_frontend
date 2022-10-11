import { Route, Routes } from 'react-router-dom';
import { MainLayout } from '@features/layout';
import { MainScreen, TestScreen } from '@screens/index';
import { CoursesScreen } from '@screens/CoursesScreen';

export const Routing = () => {
  return (
    <>
      <Routes>
        <Route path={'/'} element={<MainLayout />}>
          <Route index element={<MainScreen />} />
          <Route path={'test'} element={<TestScreen />} />
          <Route path={'courses'} element={<CoursesScreen />} />
        </Route>
      </Routes>
    </>
  );
};

export default Routing;
