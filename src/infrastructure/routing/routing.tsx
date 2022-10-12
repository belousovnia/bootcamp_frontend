import { Route, Routes } from 'react-router-dom';
import { MainLayout } from '@features/layout';
import { MainScreen, TestScreen } from '@screens/index';
import { SurveyScreen } from '@screens/SurveyScreen';
import { SurveyStepScreen } from '@screens/SurveyStepScreen';
import { SurveyGuard } from '@features/survey/components/SurveyGuard';
import { SurveyFinishScreen } from '@screens/SurveyFinishScreen';

export const Routing = () => {
  return (
    <>
      <Routes>
        <Route path={'/'} element={<MainLayout />}>
          <Route index element={<MainScreen />} />
          <Route path={'test'} element={<TestScreen />} />
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
        </Route>
      </Routes>
    </>
  );
};

export default Routing;
