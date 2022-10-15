import { CourseProviderEditForm } from '@features/courses/components/CourseProviderEditForm';
import { CourseProvidersTable } from '@features/courses/components/CourseProvidersTable';
import { CoursesEditForm } from '@features/courses/components/CoursesEditForm';
import { Box, Typography } from '@mui/material';

export const AdminCoursesEditScreen = () => {
  return (
    <>
      <Typography component={'h1'} variant="h3">
        Редактирование курса
      </Typography>
      <Box sx={{ mt: 5 }}>
        <CoursesEditForm />
      </Box>
    </>
  );
};
