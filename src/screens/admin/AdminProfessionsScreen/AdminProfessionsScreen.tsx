import { Box, Typography } from '@mui/material';
import { APP_TITLE_WITH_SEPARATOR } from '@utils/constants';
import { Helmet } from 'react-helmet';
import { ProfessionsTable } from '@features/professions';

export const AdminProfessionsScreen = () => {
  return (
    <>
      <Helmet>
        <title>Профессии {APP_TITLE_WITH_SEPARATOR}</title>
      </Helmet>
      <Typography component={'h1'} variant="h3">
        Профессии
      </Typography>
      <Box sx={{ mt: 3 }}>
        <ProfessionsTable />
      </Box>
    </>
  );
};
