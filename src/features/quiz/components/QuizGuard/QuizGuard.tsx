import { useQuizResultsStore } from '@features/quiz/hooks';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

interface QuizGuardProps {
  children: JSX.Element;
}

export const QuizGuard = ({ children }: QuizGuardProps) => {
  const navigate = useNavigate();
  const { step } = useParams();

  const [currentStep, quizState] = useQuizResultsStore((state) => [
    state.currentStep,
    state.quizState,
  ]);

  useEffect(() => {
    if (quizState === 'not-active') {
      navigate(`/quiz`, { replace: true });
      return;
    }

    if (quizState === 'completed') {
      navigate(`/quiz/finish`, { replace: true });
      return;
    }

    if (step && quizState === 'in-progress' && parseInt(step) > currentStep) {
      navigate(`/quiz/step/${currentStep}`, { replace: true });
      return;
    }

    if (!step && quizState === 'in-progress') {
      navigate(`/quiz/step/${currentStep}`, { replace: true });
    }
  }, [currentStep, navigate, step]);

  return children;
};
