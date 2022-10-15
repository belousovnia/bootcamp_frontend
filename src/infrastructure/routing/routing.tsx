import { MainLayout } from '@features/layout';
import { AdminLayout } from '@features/layout/components/AdminLayout';
import { UserLayout } from '@features/layout/components/UserLayout';
import { SurveyGuard } from '@features/survey/components/SurveyGuard';
import { AdminCourseProviderEditScreen } from '@screens/admin/AdminCourseProviderEditScreen';
import { AdminCourseProviderNewScreen } from '@screens/admin/AdminCourseProviderNewScreen';
import { AdminCourseProvidersScreen } from '@screens/admin/AdminCourseProvidersScreen';
import { CourseScreen } from '@screens/CourseScreen';
import { CoursesScreen } from '@screens/CoursesScreen';
import { LoginScreen, MainScreen, RegistrationScreen, TestScreen } from '@screens/index';
import { PageScreen } from '@screens/PageScreen';
import { SurveyFinishScreen } from '@screens/SurveyFinishScreen';
import { SurveyScreen } from '@screens/SurveyScreen';
import { SurveyStepScreen } from '@screens/SurveyStepScreen';
import { UserAccountScreen } from '@screens/UserAccountScreen';
import { UserRecommendationsScreen } from '@screens/UserRecommendationsScreen';
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
            <Route path={'recommendations'} element={<UserRecommendationsScreen />} />
            <Route path={'account'} element={<UserAccountScreen />} />
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
