import { Box, Typography } from '@mui/material';
import { APP_TITLE_WITH_SEPARATOR } from '@utils/constants';
import { Helmet } from 'react-helmet';
import { ProfessionsNewForm } from '@features/professions';

export const AdminProfessionsNewScreen = () => {
  return (
    <>
      <Helmet>
        <title>Добавить профессию {APP_TITLE_WITH_SEPARATOR}</title>
      </Helmet>
      <Typography component={'h1'} variant="h3">
        Добавить профессию
      </Typography>
      <Box sx={{ mt: 5 }}>
        <ProfessionsNewForm />
      </Box>
    </>
  );
};
