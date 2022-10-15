import { CoursesTable } from '@features/courses/components/CoursesTable';
import { Box, Typography } from '@mui/material';
import { APP_TITLE_WITH_SEPARATOR } from '@utils/constants';
import { Helmet } from 'react-helmet';

export const AdminCoursesScreen = () => {
  return (
    <>
      <Helmet>
        <title>Курсы {APP_TITLE_WITH_SEPARATOR}</title>
      </Helmet>
      <Typography component={'h1'} variant="h3">
        Курсы
      </Typography>
      <Box sx={{ mt: 3 }}>
        <CoursesTable />
      </Box>
    </>
  );
};
