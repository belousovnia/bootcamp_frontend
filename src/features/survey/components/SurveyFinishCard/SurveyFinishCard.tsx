import { Box, Button, CardActions, CardContent, Stack, Typography } from '@mui/material';
import { SurveyCard } from '../SurveyCard';
import { useSurveyResultsStore } from '@features/survey/hooks';
import { useNavigate } from 'react-router-dom';

export const SurveyFinishCard = () => {
  const navigate = useNavigate();
  const resetSurveyResultsStore = useSurveyResultsStore((state) => state.reset);

  const handleSurveyFinish = () => {
    navigate('/user/recommendations');
    setTimeout(() => {
      resetSurveyResultsStore();
    }, 200);
  };

  return (
    <SurveyCard component="section">
      <Box component="header" p={3} pb={0}>
        <Typography variant="h3" component="h1">
          Поздравляем! <br /> вы успешно прошли тест
        </Typography>
      </Box>
      <CardContent>Результаты теста ждут вас на странице рекомендаций</CardContent>
      <CardActions style={{ marginTop: 10 }}>
        <Stack direction={'row'} spacing={1} width={'100%'}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            sx={{ py: 2, flexGrow: 1 }}
            onClick={handleSurveyFinish}
          >
            Перейти к рекомендациям
          </Button>
        </Stack>
      </CardActions>
    </SurveyCard>
  );
};
