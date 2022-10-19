import { Box, Typography } from '@mui/material';

export const UserRecommendedProfessions = () => {
  return (
    <>
      <Typography variant={'h3'} component={'h1'}>
        Рекомендуемые профессии
      </Typography>
      <Typography variant={'subtitle1'} component={'h3'} sx={{ mt: 1 }}>
        На основе ваших предпочтений
      </Typography>
      <Box sx={{ height: 200 }}></Box>
    </>
  );
};
