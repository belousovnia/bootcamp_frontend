import { useSurveyResultsStore } from '@features/survey/hooks';
import { Box, Button, CardActions, CardContent, Typography } from '@mui/material';
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
      <Box component="header" p={3}>
        <Typography variant="h3" component="h1">
          Пройти тест <br />и подобрать IT профессию
        </Typography>
      </Box>
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
