import { CoursesNewForm } from '@features/courses/components/CoursesNewForm';
import { Box, Typography } from '@mui/material';

export const AdminCoursesNewScreen = () => {
  return (
    <>
      <Typography component={'h1'} variant="h3">
        Добавить курс
      </Typography>
      <Box sx={{ mt: 5 }}>
        <CoursesNewForm />
      </Box>
    </>
  );
};
