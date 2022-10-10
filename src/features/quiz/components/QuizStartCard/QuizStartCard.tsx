import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Typography,
  useTheme,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

export const QuizStartCard = () => {
  const navigate = useNavigate();

  return (
    <Card component="section">
      <CardHeader
        title="Подобрать IT Профессию"
        titleTypographyProps={{ component: 'h1', variant: 'h3' }}
        component="header"
      />
      <CardContent sx={{ maxWidth: 400, pt: 1 }}>
        <Typography variant="body1" component="p">
          Ответьте на 30 вопросов и узнайте наиболее подходящее для вас IT направление
        </Typography>
      </CardContent>
      <CardActions sx={{ mt: 3 }}>
        <Button
          variant="contained"
          color="primary"
          size="large"
          fullWidth
          sx={{ py: 2 }}
          onClick={() => navigate('/quiz/step/1')}
        >
          Начать тестирование
        </Button>
      </CardActions>
    </Card>
  );
};
