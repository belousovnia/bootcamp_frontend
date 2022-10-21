import React from 'react';
import { Alert, Box, CircularProgress, Grid, Typography } from '@mui/material';
import { ProfessionCard } from '@features/professions/components';
import { useAllProfessions } from '@features/professions/professions.hooks';

export const Professions = () => {
  const professions = useAllProfessions();
  return (
    <Box
      sx={{
        maxWidth: 'xl',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        alignItems: 'center',
      }}
    >
      <Typography variant={'h3'}>Профессии в IT</Typography>
      {professions.isLoading && <CircularProgress size="4rem" />}
      {!professions.isLoading && !professions.data?.length && (
        <Alert severity="error">
          Профессии не найдены. Попробуйте перезагрузить страницу.
        </Alert>
      )}
      <Grid container spacing={4}>
        {professions.data?.map((profession) => {
          return (
            <Grid key={profession.id} item xs={12} sm={6} md={4} lg={4}>
              <ProfessionCard profession={profession} />
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};
