import {
  SurveyResultsState,
  useSurvey,
  useSurveyResultsStore,
} from '@features/survey/hooks';
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
import { useNavigate } from 'react-router-dom';
import { SurveyCard } from '../SurveyCard';
import { SurveyProgress } from '../SurveyProgress';
import { SurveyStepBody } from './SurveyStepBody';

export const SurveyStepCard = () => {
  const navigate = useNavigate();
  const { data, error, isLoading } = useSurvey();
  const [currentAnswerId, setCurrentAnswerId] = useState<number | null>(null);

  const resetSurveyResultsStore = useSurveyResultsStore((state) => state.reset);

  const [currentStep, setCurrentStep] = useSurveyResultsStore((state) => [
    state.currentStep,
    state.setCurrentStep,
  ]);

  const [answers, setAnswer] = useSurveyResultsStore((state) => [
    state.answers,
    state.setStepAnswer,
  ]);

  const setSurveyState = useSurveyResultsStore((state) => state.setSurveyState);

  const totalSteps = useMemo(() => data?.survey.length, [data]);
  const currentQuestion = data?.survey[currentStep];

  const backButtonText = useMemo(
    () => (currentStep === 0 ? 'Назад' : 'Предыдущий вопрос'),
    [currentStep],
  );

  const isLastStep = useMemo(
    () => currentStep + 1 === totalSteps,
    [currentStep, totalSteps],
  );

  const nextButtonText = useMemo(
    () => (isLastStep ? 'Завершить тестирование' : 'Следующий вопрос'),
    [isLastStep],
  );

  const mutationCallback = useCallback(() => {
    const args: CreateSurveyResultsArgs = {
      surveyId: data?.surveyId as number,
      survey: Object.keys(answers).map((key) => ({
        questionId: Number(key),
        answerId: answers[Number(key)],
      })),
    };

    return createSurveyResults(args).then(() => {
      navigate('/user/recommendations');
      setTimeout(() => {
        resetSurveyResultsStore();
      }, 100);
    });
  }, [data, answers]);

  const {
    mutate,
    isLoading: isSubmitting,
    isError: isSubmitError,
    error: submitError,
  } = useMutation<void, Error, void>(mutationCallback);

  const handleBackButtonClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    if (currentStep === 0) {
      setCurrentAnswerId(null);
      setSurveyState('not-active');
      navigate(`/survey`);
    } else {
      setCurrentStep(currentStep - 1);

      if (currentAnswerId) {
        const questionId = data?.survey[currentStep].questionId as number;
        setAnswer(questionId, currentAnswerId);
      }

      const prevQuestionId = data?.survey[currentStep - 1].questionId;
      if (prevQuestionId) {
        setCurrentAnswerId(answers[prevQuestionId]);
      }
      navigate(`/survey/step/${currentStep - 1}`);
    }
  };

  const handleNextButtonClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();

    if (!currentAnswerId) {
      return;
    }

    const questionId = data?.survey[currentStep].questionId as number;
    setAnswer(questionId, currentAnswerId);

    if (isLastStep) {
      setSurveyState('completed');
      setTimeout(() => {
        mutate();
      }, 100);
      return;
    }

    const nextQuestionId = data?.survey[currentStep + 1].questionId;

    if (nextQuestionId) {
      setCurrentStep(currentStep + 1);
      setCurrentAnswerId(answers[nextQuestionId] || null);
      navigate(`/survey/step/${currentStep + 1}`);
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
            <SurveyProgress currentStep={currentStep + 1} totalSteps={totalSteps || 10} />
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
