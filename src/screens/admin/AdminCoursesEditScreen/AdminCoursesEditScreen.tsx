import { CoursesEditForm } from '@features/courses/components/CoursesEditForm';
import { Box, Typography } from '@mui/material';
import { APP_TITLE_WITH_SEPARATOR } from '@utils/constants';
import { Helmet } from 'react-helmet';

export const AdminCoursesEditScreen = () => {
  return (
    <>
      <Helmet>
        <title>Редактирование курса {APP_TITLE_WITH_SEPARATOR}</title>
      </Helmet>
      <Typography component={'h1'} variant="h3">
        Редактирование курса
      </Typography>
      <Box sx={{ mt: 5 }}>
        <CoursesEditForm />
      </Box>
    </>
  );
};
