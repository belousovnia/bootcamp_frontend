import { CoursesNewForm } from '@features/courses/components/CoursesNewForm';
import { Box, Typography } from '@mui/material';
import { APP_TITLE_WITH_SEPARATOR } from '@utils/constants';
import { Helmet } from 'react-helmet';

export const AdminCoursesNewScreen = () => {
  return (
    <>
      <Helmet>
        <title>Добавить курс {APP_TITLE_WITH_SEPARATOR}</title>
      </Helmet>
      <Typography component={'h1'} variant="h3">
        Добавить курс
      </Typography>
      <Box sx={{ mt: 5 }}>
        <CoursesNewForm />
      </Box>
    </>
  );
};
