import { useSurveyResultsStore } from '@features/survey/hooks';
import { Button, CardActions, CardContent, CardHeader, Typography } from '@mui/material';
import { MouseEventHandler } from 'react';
import { useNavigate } from 'react-router-dom';
import { SurveyCard } from '../SurveyCard';

export const SurveyStartCard = () => {
  const navigate = useNavigate();
  const setSurveyState = useSurveyResultsStore((state) => state.setSurveyState);

  const handleStartSurvey: MouseEventHandler<HTMLButtonElement> = (e) => {
    setSurveyState('in-progress');
    navigate('/survey/step/1');

    e.preventDefault();
  };

  return (
    <SurveyCard component="section">
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
      <CardActions style={{ marginTop: 20 }} sx={{ p: 2 }}>
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
    </SurveyCard>
  );
};
