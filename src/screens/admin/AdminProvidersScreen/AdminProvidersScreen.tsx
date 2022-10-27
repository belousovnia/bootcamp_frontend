import { ProvidersTable } from '@features/providers/components/admin/ProvidersTable';
import { Box, Typography } from '@mui/material';
import { APP_TITLE_WITH_SEPARATOR } from '@utils/constants';
import { Helmet } from 'react-helmet';

export const AdminProvidersScreen = () => {
  return (
    <>
      <Helmet>
        <title>
          Добавить создателя курсов
          {APP_TITLE_WITH_SEPARATOR}
        </title>
      </Helmet>
      <Typography component={'h1'} variant="h3">
        Создатели курсов
      </Typography>
      <Box sx={{ mt: 3 }}>
        <ProvidersTable />
      </Box>
    </>
  );
};
