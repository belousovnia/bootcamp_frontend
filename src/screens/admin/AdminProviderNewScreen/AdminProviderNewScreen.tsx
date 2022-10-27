import { ProviderNewForm } from '@features/providers/components/admin/ProviderNewForm';
import { Box, Typography } from '@mui/material';

export const AdminProviderNewScreen = () => {
  return (
    <>
      <Typography component={'h1'} variant="h3">
        Добавить создателя курсов
      </Typography>
      <Box sx={{ mt: 5 }}>
        <ProviderNewForm />
      </Box>
    </>
  );
};
