import { CardContent, CardHeader } from '@mui/material';
import { SurveyCard } from '../SurveyCard';

export const SurveyFinishCard = () => {
  return (
    <SurveyCard component="section">
      <CardHeader
        title="FinishCard"
        titleTypographyProps={{ component: 'h1', variant: 'h3' }}
        component="header"
      />
      <CardContent>content</CardContent>
    </SurveyCard>
  );
};
