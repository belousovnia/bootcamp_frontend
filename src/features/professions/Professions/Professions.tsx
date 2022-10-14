import React from 'react';
import { Grid, Paper, Typography } from '@mui/material';
import { ProfessionCard } from '@features/professions/components';
import { useProfessions } from '@features/professions/professions.hooks';

export const Professions = () => {
  const professions = useProfessions();
  return (
    <Paper
      sx={{
        maxWidth: 'xl',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        alignItems: 'center',
        padding: '1.5rem',
        width: '100%',
      }}
      elevation={1}
    >
      <Typography variant={'h3'}>Профессии в IT</Typography>
      <Grid container spacing={2}>
        {professions.data?.map((profession) => {
          return (
            <Grid key={profession.id} item>
              <ProfessionCard profession={profession} />
            </Grid>
          );
        })}
      </Grid>
    </Paper>
  );
};
