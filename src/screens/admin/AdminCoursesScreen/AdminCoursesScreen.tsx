import { CoursesTable } from '@features/courses/components/CoursesTable';
import { Box, Typography } from '@mui/material';

export const AdminCoursesScreen = () => {
  return (
    <>
      <Typography component={'h1'} variant="h3">
        Курсы
      </Typography>
      <Box sx={{ mt: 3 }}>
        <CoursesTable />
      </Box>
    </>
  );
};
