import { QuizQuestion } from '@features/quiz/quiz.entity';
import { CheckBox, CheckBoxOutlined } from '@mui/icons-material';
import {
  Box,
  FormControlLabel,
  FormGroup,
  Radio,
  RadioGroup,
  Typography,
} from '@mui/material';

interface QuizStepBodyProps {
  question: QuizQuestion;
  answer: number | null;
  onAnswerChange: (answer: number) => void;
}

export const QuizStepBody = ({ question, onAnswerChange, answer }: QuizStepBodyProps) => {
  return (
    <Box sx={{ my: 2 }}>
      <form>
        <Typography variant="h6" component="h3" sx={{ mb: 1 }}>
          {question.text}
        </Typography>

        <RadioGroup onChange={(e, val) => onAnswerChange(parseInt(val))} value={answer}>
          {question.variants.map((answer, index) => (
            <FormControlLabel
              key={index + 1}
              label={answer.text}
              value={index + 1}
              name={'question-answer'}
              control={<Radio color="primary" />}
            />
          ))}
        </RadioGroup>
      </form>
    </Box>
  );
};
