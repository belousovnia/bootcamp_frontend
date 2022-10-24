import { useSurvey, useSurveyResultsStore } from '@features/survey/hooks';
import {
  createSurveyResults,
  CreateSurveyResultsArgs,
} from '@features/survey/survey.service';
import {
  Alert,
  AlertTitle,
  Button,
  CardActions,
  CardContent,
  CardHeader,
  CircularProgress,
  Stack,
} from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { ContainerLoader } from '@ui-library/components/ContainerLoader';
import { MouseEventHandler, useCallback, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { SurveyCard } from '../SurveyCard';
import { SurveyProgress } from '../SurveyProgress';
import { SurveyStepBody } from './SurveyStepBody';

export const SurveyStepCard = () => {
  const navigate = useNavigate();
  const { step } = useParams();

  if (!step) {
    return null;
  }

  // В url указан номер шага, который начинается с 1, а в массиве с вопросами с 0
  const stepAsIndex = parseInt(step) - 1;

  const { data, error, isLoading } = useSurvey();
  const [currentAnswerId, setCurrentAnswerId] = useState<number | null>(null);

  const resetSurveyResultsStore = useSurveyResultsStore((state) => state.reset);

  const setCurrentStep = useSurveyResultsStore((state) => state.setCurrentStep);

  const [answers, setAnswer] = useSurveyResultsStore((state) => [
    state.answers,
    state.setStepAnswer,
  ]);

  const setSurveyState = useSurveyResultsStore((state) => state.setSurveyState);

  const totalSteps = useMemo(() => data?.survey.length, [data]);
  const currentQuestion = data?.survey[parseInt(step, 10) - 1];

  const backButtonText = useMemo(
    () => (stepAsIndex === 0 ? 'Назад' : 'Предыдущий вопрос'),
    [stepAsIndex],
  );

  const isLastStep = useMemo(
    () => stepAsIndex + 1 === totalSteps,
    [stepAsIndex, totalSteps],
  );

  const nextButtonText = useMemo(
    () => (isLastStep ? 'Завершить тестирование' : 'Следующий вопрос'),
    [isLastStep],
  );

  const mutationCallback = useCallback(() => {
    const args: CreateSurveyResultsArgs = {
      surveyId: data?.surveyId as number,
      survey: Object.keys(answers).map((key) => ({
        questionId: parseInt(key),
        answerId: answers[parseInt(key)],
      })),
    };

    return createSurveyResults(args).then(() => {
      navigate('/user/recommendations');
      setTimeout(() => {
        resetSurveyResultsStore();
      }, 200);
    });
  }, [data, answers]);

  const {
    mutate,
    isLoading: isSubmitting,
    error: submitError,
  } = useMutation<void, Error, void>(mutationCallback);

  const handleBackButtonClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    setCurrentAnswerId(null);
    if (stepAsIndex === 0) {
      resetSurveyResultsStore();
      navigate(`/survey`);
    } else {
      setCurrentStep(stepAsIndex - 1);
      navigate(`/survey/step/${parseInt(step) - 1}`);
    }
  };

  const handleNextButtonClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();

    if (!currentAnswerId) {
      return;
    }

    const questionId = data?.survey[stepAsIndex].questionId as number;
    setAnswer(questionId, currentAnswerId);

    if (isLastStep) {
      setSurveyState('completed');
      setTimeout(() => {
        mutate();
      }, 200);
      return;
    }

    const nextQuestionId = data?.survey[stepAsIndex + 1].questionId;

    if (nextQuestionId) {
      setCurrentStep(stepAsIndex + 1);
      navigate(`/survey/step/${parseInt(step) + 1}`);
      setCurrentAnswerId(null);
    }
  };

  const handleAnswerChange = (answerId: number) => {
    setCurrentAnswerId(answerId);
  };

  return (
    <SurveyCard component="section">
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
      {error && (
        <CardContent>
          <Alert color="error">
            <AlertTitle>Ой! Кажется произошла ошибка при загрузке теста</AlertTitle>
            {error.message}
          </Alert>
        </CardContent>
      )}

      {submitError && (
        <CardContent>
          <Alert color="error">
            <AlertTitle>
              Ой! Кажется произошла ошибка отправке результатов теста
            </AlertTitle>
            {submitError.message}
          </Alert>
        </CardContent>
      )}
      {data && (
        <ContainerLoader isLoading={isSubmitting}>
          <CardContent>
            <SurveyProgress currentStep={stepAsIndex + 1} totalSteps={totalSteps || 10} />
            {currentQuestion && (
              <SurveyStepBody
                question={currentQuestion}
                answer={currentAnswerId}
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
                disabled={!currentAnswerId}
              >
                {nextButtonText}
              </Button>
            </Stack>
          </CardActions>
        </ContainerLoader>
      )}
    </SurveyCard>
  );
};
