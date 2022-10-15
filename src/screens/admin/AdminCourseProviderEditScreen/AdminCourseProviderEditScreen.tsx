import { CourseProviderEditForm } from '@features/courses/components/CourseProviderEditForm';
import { Box, Typography } from '@mui/material';
import { APP_TITLE_WITH_SEPARATOR } from '@utils/constants';
import { Helmet } from 'react-helmet';

export const AdminCourseProviderEditScreen = () => {
  return (
    <>
      <Helmet>
        <title>
          Редактирование создателя курсов
          {APP_TITLE_WITH_SEPARATOR}
        </title>
      </Helmet>
      <Typography component={'h1'} variant="h3">
        Редактирование создателя курсов
      </Typography>
      <Box sx={{ mt: 5 }}>
        <CourseProviderEditForm />
      </Box>
    </>
  );
};
