import { Card, CardContent, CardHeader } from '@mui/material';

export const SurveyFinishCard = () => {
  return (
    <Card component="section" sx={{ maxWidth: 800, m: 'auto' }}>
      <CardHeader
        title="FinishCard"
        titleTypographyProps={{ component: 'h1', variant: 'h3' }}
        component="header"
      />
      <CardContent>content</CardContent>
    </Card>
  );
};
