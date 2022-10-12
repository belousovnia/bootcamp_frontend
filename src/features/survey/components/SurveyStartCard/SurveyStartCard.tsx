import { useSurveyResultsStore } from '@features/survey/hooks';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Typography,
  useTheme,
} from '@mui/material';
import { MouseEventHandler } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export const SurveyStartCard = () => {
  const navigate = useNavigate();
  const setSurveyState = useSurveyResultsStore((state) => state.setSurveyState);
  const setCurrentStep = useSurveyResultsStore((state) => state.setCurrentStep);

  const handleStartSurvey: MouseEventHandler<HTMLButtonElement> = (e) => {
    setSurveyState('in-progress');
    navigate('/survey/step/1');

    e.preventDefault();
  };

  return (
    <Card component="section" sx={{ maxWidth: 800, m: 'auto' }}>
      <CardHeader
        title="Подобрать IT направление"
        titleTypographyProps={{ component: 'h1', variant: 'h3' }}
        component="header"
      />
      <CardContent style={{ paddingTop: 0 }}>
        <Typography variant="body1" component="p" style={{ maxWidth: 400 }}>
          Ответьте на 10 вопросов и узнайте наиболее подходящее для вас IT направление
        </Typography>
      </CardContent>
      <CardActions style={{ marginTop: 20 }}>
        <Button
          variant="contained"
          color="primary"
          size="large"
          fullWidth
          sx={{ py: 2 }}
          onClick={handleStartSurvey}
        >
          Начать тестирование
        </Button>
      </CardActions>
    </Card>
  );
};
