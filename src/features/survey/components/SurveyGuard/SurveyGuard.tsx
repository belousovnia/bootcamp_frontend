import { useSurveyResultsStore } from '@features/survey/hooks';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuthStore } from '@features/auth';
import { Navigate } from 'react-router-dom';

interface SurveyGuardProps {
  children: JSX.Element;
}

export const SurveyGuard = ({ children }: SurveyGuardProps) => {
  const navigate = useNavigate();
  const { step } = useParams();
  const isAuth = useAuthStore((state) => state.isAuth);

  const [currentStep, surveyState] = useSurveyResultsStore((state) => [
    state.currentStep,
    state.surveyState,
  ]);

  useEffect(() => {
    if (surveyState === 'not-active') {
      navigate(`/survey`, { replace: true });
      return;
    }

    // if (surveyState === 'completed') {
    //   navigate(`/survey/finish`, { replace: true });
    //   return;
    // }

    if (step && surveyState === 'in-progress' && parseInt(step) > currentStep + 1) {
      navigate(`/survey/step/${currentStep + 1}`, { replace: true });
      return;
    }

    if (!step && surveyState === 'in-progress') {
      navigate(`/survey`, { replace: true });
    }
  }, [currentStep, navigate, step, isAuth]);

  return isAuth ? children : <Navigate to="/registration" state={{ from: '/survey' }} />;
};
