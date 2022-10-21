import { Box, Typography } from '@mui/material';
import { APP_TITLE_WITH_SEPARATOR } from '@utils/constants';
import { Helmet } from 'react-helmet';
import { ProfessionsEditForm } from '@features/professions';

export const AdminProfessionsEditScreen = () => {
  return (
    <>
      <Helmet>
        <title>Редактирование профессии {APP_TITLE_WITH_SEPARATOR}</title>
      </Helmet>
      <Typography component={'h1'} variant="h3">
        Редактирование профессии
      </Typography>
      <Box sx={{ mt: 5 }}>
        <ProfessionsEditForm />
      </Box>
    </>
  );
};
