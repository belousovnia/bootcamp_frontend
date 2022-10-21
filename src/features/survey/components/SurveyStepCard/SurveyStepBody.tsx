import { SurveyQuestion } from '@features/survey/survey.entity';
import { CheckBox, CheckBoxOutlined } from '@mui/icons-material';
import {
  Box,
  FormControlLabel,
  FormGroup,
  Radio,
  RadioGroup,
  Typography,
} from '@mui/material';

interface SurveyStepBodyProps {
  question: SurveyQuestion;
  answer: number | null;
  onAnswerChange: (answer: number) => void;
}

export const SurveyStepBody = ({
  question,
  onAnswerChange,
  answer,
}: SurveyStepBodyProps) => {
  console.log('answer', answer);

  return (
    <Box sx={{ my: 2 }}>
      <form>
        <Typography variant="h6" component="h3" sx={{ mb: 2 }}>
          {question.question}
        </Typography>

        <RadioGroup onChange={(e, val) => onAnswerChange(parseInt(val))} value={answer}>
          {question.answers.map((a, index) => (
            <FormControlLabel
              key={index + 1}
              label={a.text}
              value={a.answerId}
              name={'question-answer'}
              control={<Radio color="primary" checked={answer === a.answerId} />}
              sx={{ mb: 1 }}
            />
          ))}
        </RadioGroup>
      </form>
    </Box>
  );
};
