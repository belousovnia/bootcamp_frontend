import { CourseProviderNewForm } from '@features/courses/components/CourseProviderNewForm';
import { Box, Typography } from '@mui/material';

export const AdminCourseProviderNewScreen = () => {
  return (
    <>
      <Typography component={'h1'} variant="h3">
        Добавить создателя курсов
      </Typography>
      <Box sx={{ mt: 5 }}>
        <CourseProviderNewForm />
      </Box>
    </>
  );
};
