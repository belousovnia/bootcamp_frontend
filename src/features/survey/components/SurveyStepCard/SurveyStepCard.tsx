import { useSurvey, useSurveyResultsStore } from '@features/survey/hooks';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CircularProgress,
  Stack,
} from '@mui/material';
import { MouseEventHandler, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { SurveyProgress } from '../SurveyProgress';
import { SurveyStepBody } from './SurveyStepBody';

// @TODO: handle error state
export const SurveyStepCard = () => {
  const navigate = useNavigate();
  const { step } = useParams(); // step from params
  const { data, error, isLoading } = useSurvey();
  const [currentAnswer, setCurrentAnswer] = useState<number | null>(null);

  const [currentStep, setCurrentStep] = useSurveyResultsStore((state) => [
    state.currentStep,
    state.setCurrentStep,
  ]);

  const [answers, setAnswer] = useSurveyResultsStore((state) => [
    state.answers,
    state.setStepAnswer,
  ]);

  const setSurveyState = useSurveyResultsStore((state) => state.setSurveyState);

  const totalSteps = useMemo(() => data?.questions.length, [data]);
  const currentQuestion = data?.questions[currentStep - 1];

  const backButtonText = useMemo(
    () => (currentStep === 1 ? 'Назад' : 'Предыдущий вопрос'),
    [currentStep],
  );

  const isLastStep = useMemo(() => currentStep === totalSteps, [currentStep, totalSteps]);

  const nextButtonText = useMemo(
    () => (isLastStep ? 'Завершить тестирование' : 'Следующий вопрос'),
    [isLastStep],
  );

  const handleBackButtonClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    if (currentStep === 1) {
      setCurrentAnswer(null);
      setSurveyState('not-active');
      navigate(`/survey`);
    } else {
      setCurrentStep(currentStep - 1);
      setCurrentAnswer(answers[currentStep - 1]?.number || null);
      navigate(`/survey/step/${currentStep - 1}`);
    }
  };

  const handleNextButtonClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();

    if (!currentAnswer) {
      return;
    }

    if (isLastStep) {
      setSurveyState('completed');
      navigate(`/survey/finish`);
    }

    setAnswer(currentStep, {
      number: currentAnswer as number,
    });

    setCurrentAnswer(answers[currentStep + 1]?.number || null);
    setCurrentStep(currentStep + 1);

    navigate(`/survey/step/${currentStep + 1}`);
  };

  const handleAnswerChange = (answer: number) => {
    setCurrentAnswer(answer);
  };

  return (
    <Card component="section" sx={{ maxWidth: 800, m: 'auto' }}>
      <CardHeader
        title="Подобрать IT направление"
        titleTypographyProps={{ component: 'h1', variant: 'h3' }}
        component="header"
      />
      {isLoading && (
        <CardContent sx={{ justifyContent: 'center' }}>
          <CircularProgress />
        </CardContent>
      )}
      {data && (
        <>
          <CardContent>
            <SurveyProgress currentStep={currentStep} totalSteps={totalSteps || 10} />
            {currentQuestion && (
              <SurveyStepBody
                question={currentQuestion}
                answer={currentAnswer}
                onAnswerChange={handleAnswerChange}
              />
            )}
          </CardContent>
          <CardActions style={{ marginTop: 10 }}>
            <Stack direction={'row'} spacing={1} width={'100%'}>
              <Button
                variant="text"
                color="primary"
                size="large"
                sx={{ py: 2, flexGrow: 1 }}
                onClick={handleBackButtonClick}
              >
                {backButtonText}
              </Button>
              <Button
                variant="contained"
                color="primary"
                size="large"
                sx={{ py: 2, flexGrow: 1 }}
                onClick={handleNextButtonClick}
                disabled={!currentAnswer}
              >
                {nextButtonText}
              </Button>
            </Stack>
          </CardActions>
        </>
      )}
    </Card>
  );
};
