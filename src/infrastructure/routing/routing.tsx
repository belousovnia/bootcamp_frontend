import { Route, Routes } from 'react-router-dom';
import { MainLayout } from '@features/layout';
import { MainScreen, TestScreen } from '@screens/index';
import { QuizScreen } from '@screens/QuizScreen';
import { QuizStepScreen } from '@screens/QuizStepScreen';
import { QuizGuard } from '@features/quiz/components/QuizGuard';
import { QuizFinishScreen } from '@screens/QuizFinishScreen';

export const Routing = () => {
  return (
    <>
      <Routes>
        <Route path={'/'} element={<MainLayout />}>
          <Route index element={<MainScreen />} />
          <Route path={'test'} element={<TestScreen />} />
          <Route
            path={'quiz'}
            element={
              <QuizGuard>
                <QuizScreen />
              </QuizGuard>
            }
          />
          <Route
            path={'quiz/step/:step'}
            element={
              <QuizGuard>
                <QuizStepScreen />
              </QuizGuard>
            }
          />
          <Route
            path={'quiz/finish'}
            element={
              <QuizGuard>
                <QuizFinishScreen />
              </QuizGuard>
            }
          />
        </Route>
      </Routes>
    </>
  );
};

export default Routing;
