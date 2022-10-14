import { CourseProvidersTable } from '@features/courses/components/CourseProvidersTable';
import { Box, Typography } from '@mui/material';

export const AdminCourseProvidersScreen = () => {
  return (
    <>
      <Typography component={'h1'} variant="h3">
        Создатели курсов
      </Typography>
      <Box sx={{ mt: 3 }}>
        <CourseProvidersTable />
      </Box>
    </>
  );
};
