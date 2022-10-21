import { CoursesView } from '@features/courses/components/CoursesView';
import { Box, Typography, useMediaQuery } from '@mui/material';
import { APP_TITLE_WITH_SEPARATOR } from '@utils/constants';
import { useMemo } from 'react';
import { Helmet } from 'react-helmet';
import { useSearchParams } from 'react-router-dom';

export const CoursesScreen = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const professionId = useMemo(() => {
    const professionId = searchParams.get('professionId');
    return professionId ? Number(professionId) : undefined;
  }, [searchParams]);

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
          <CoursesView filterOptions={{ professionId }} />
        </Box>
      </section>
    </>
  );
};
