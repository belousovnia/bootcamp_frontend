import { CoursesView } from '@features/courses/components/CoursesView';
import { Box, Typography } from '@mui/material';
import { APP_TITLE_WITH_SEPARATOR } from '@utils/constants';
import { Helmet } from 'react-helmet';

export const CoursesScreen = () => {
  return (
    <>
      <Helmet>
        <title>Подобрать IT профессию {APP_TITLE_WITH_SEPARATOR}</title>
      </Helmet>
      <section>
        <Typography variant="h3" component={'h1'}>
          Курсы
        </Typography>
        <Typography variant="subtitle1" component={'h2'} sx={{ mt: 1, mb: 1 }}>
          Лучшие курсы от лидеров рынка
        </Typography>
        <Box sx={{ mt: 3 }}>
          <CoursesView />
        </Box>
      </section>
    </>
  );
};
