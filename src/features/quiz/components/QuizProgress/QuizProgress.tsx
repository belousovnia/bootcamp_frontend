import { Box, LinearProgress, Typography } from '@mui/material';

interface QuizProgressProps {
  currentStep: number;
  totalSteps: number;
}

export const QuizProgress = ({ currentStep, totalSteps }: QuizProgressProps) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: '100%', mr: 1 }}>
        <LinearProgress variant="determinate" value={(currentStep / totalSteps) * 100} />
      </Box>
      <Box sx={{ minWidth: 35, flexShrink: 0 }}>
        <Typography variant="body1">
          {currentStep} из {totalSteps}
        </Typography>
      </Box>
    </Box>
  );
};
