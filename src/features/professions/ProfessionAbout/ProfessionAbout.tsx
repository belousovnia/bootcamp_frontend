import React from 'react';
import { Box, Button, CircularProgress, Paper, Typography } from '@mui/material';
import { useProfession } from '@features/professions/professions.hooks';
import { useNavigate } from 'react-router-dom';

interface ProfessionAboutProps {
  id: string;
}

export const ProfessionAbout: React.FC<ProfessionAboutProps> = ({ id }) => {
  const profession = useProfession(id);
  const navigate = useNavigate();
  const navigateToCourses = () => {
    navigate(`/courses/?professionId=${id}`, { replace: true });
  };
  if (profession.isLoading) {
    return (
      <Paper
        sx={{
          maxWidth: 'xl',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'middle',
        }}
      >
        <CircularProgress size="4rem" />
      </Paper>
    );
  } else {
    return (
      <Paper
        sx={{
          maxWidth: 'xl',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          alignItems: 'center',
          justifyContent: 'middle',
          padding: 3,
        }}
      >
        <Typography variant={'h3'}>{profession.data?.name}</Typography>
        <Box
          component={'img'}
          src={profession.data?.coverUrl}
          alt={'обложка'}
          sx={{ borderRadius: 1 }}
        />
        <Typography variant={'body1'} sx={{ whiteSpace: 'pre-wrap' }}>
          {profession.data?.description}
        </Typography>
        <Button variant={'contained'} size={'large'} onClick={() => navigateToCourses()}>
          Посмотреть курсы по этой профессии
        </Button>
      </Paper>
    );
  }
};
