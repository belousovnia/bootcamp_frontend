import { MainLayout } from '@features/layout';
import { CourseScreen } from '@screens/CourseScreen';
import { CoursesScreen } from '@screens/CoursesScreen';
import { MainScreen, TestScreen } from '@screens/index';
import { PageScreen } from '@screens/PageScreen';
import { Route, Routes } from 'react-router-dom';

export const Routing = () => {
  return (
    <>
      <Routes>
        <Route path={'/'} element={<MainLayout />}>
          <Route index element={<MainScreen />} />
          <Route path={'test'} element={<TestScreen />} />
          <Route path={'courses'} element={<CoursesScreen />} />
          <Route path={'courses/:id'} element={<CourseScreen />} />
          <Route path={'pages/:slug'} element={<PageScreen />} />
        </Route>
      </Routes>
    </>
  );
};

export default Routing;
