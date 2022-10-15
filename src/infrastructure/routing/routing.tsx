import { MainLayout } from '@features/layout';
import { CourseScreen } from '@screens/CourseScreen';
import { CoursesScreen } from '@screens/CoursesScreen';
import { PageScreen } from '@screens/PageScreen';
import { Route, Routes } from 'react-router-dom';
import { SurveyScreen } from '@screens/SurveyScreen';
import { SurveyStepScreen } from '@screens/SurveyStepScreen';
import { SurveyGuard } from '@features/survey/components/SurveyGuard';
import { SurveyFinishScreen } from '@screens/SurveyFinishScreen';
import { AdminLayout } from '@features/layout/components/AdminLayout';
import { AdminCourseProvidersScreen } from '@screens/admin/AdminCourseProvidersScreen';
import { AdminCourseProviderEditScreen } from '@screens/admin/AdminCourseProviderEditScreen';
import { AdminCourseProviderNewScreen } from '@screens/admin/AdminCourseProviderNewScreen';
import { MainScreen, TestScreen, LoginScreen, RegistrationScreen } from '@screens/index';
import { UserLayout } from '@features/layout/components/UserLayout';

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
          <Route
            path={'survey'}
            element={
              <SurveyGuard>
                <SurveyScreen />
              </SurveyGuard>
            }
          />
          <Route
            path={'survey/step/:step'}
            element={
              <SurveyGuard>
                <SurveyStepScreen />
              </SurveyGuard>
            }
          />
          <Route
            path={'survey/finish'}
            element={
              <SurveyGuard>
                <SurveyFinishScreen />
              </SurveyGuard>
            }
          />

          {/* Admin */}
          <Route path={'admin/*'} element={<AdminLayout />}>
            <Route path={'course-providers'} element={<AdminCourseProvidersScreen />} />
            <Route
              path={'course-providers/:id/edit'}
              element={<AdminCourseProviderEditScreen />}
            />
            <Route
              path={'course-providers/new'}
              element={<AdminCourseProviderNewScreen />}
            />
          </Route>

          {/* User */}
          <Route path={'user/*'} element={<UserLayout />}>
            <Route path={'recommendations'} element={<AdminCourseProvidersScreen />} />
          </Route>

          {/* Auth */}
          <Route path={'login'} element={<LoginScreen />} />
          <Route path={'registration'} element={<RegistrationScreen />} />
        </Route>
      </Routes>
    </>
  );
};

export default Routing;
