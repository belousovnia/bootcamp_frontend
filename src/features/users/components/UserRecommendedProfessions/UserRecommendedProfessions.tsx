import { Alert, Grid, Typography } from '@mui/material';
import { useProfession } from '@features/professions/professions.hooks';
import { ProfessionCard } from '@features/professions/components';
import React from 'react';

export const UserRecommendedProfessions = ({
  professionId,
}: {
  professionId: string;
}) => {
  const { data, error } = useProfession(professionId);
  return (
    <>
      <Typography variant={'h3'} component={'h1'}>
        Рекомендуемая профессия
      </Typography>
      <Typography variant={'subtitle1'} component={'h3'} sx={{ mt: 1 }}>
        На основе ваших предпочтений
      </Typography>
      {error && (
        <Alert severity="error" sx={{ mt: 3 }}>
          Ой! Кажется произошла ошибка при загрузке рекомендуемых профессий
        </Alert>
      )}
      {data && (
        <Grid container spacing={4} marginTop={0}>
          <Grid item xs={12} sm={6} md={6} lg={6}>
            <ProfessionCard profession={data} />
          </Grid>
        </Grid>
      )}
    </>
  );
};
