import { CourseProviderEditForm } from '@features/courses/components/CourseProviderEditForm';
import { CourseProvidersTable } from '@features/courses/components/CourseProvidersTable';
import { Box, Typography } from '@mui/material';

export const AdminCourseProviderEditScreen = () => {
  return (
    <>
      <Typography component={'h1'} variant="h3">
        Редактирование создателя курсов
      </Typography>
      <Box sx={{ mt: 5 }}>
        <CourseProviderEditForm />
      </Box>
    </>
  );
};
