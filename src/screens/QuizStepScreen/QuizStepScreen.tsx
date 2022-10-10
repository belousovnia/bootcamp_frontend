import { useParams } from 'react-router-dom';

export const QuizStepScreen = () => {
  const { step } = useParams();
  return <h1>Quiz Step {step}</h1>;
};
