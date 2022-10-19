import { CoursesView } from '@features/courses/components/CoursesView';
import { Typography } from '@mui/material';

export const UserRecommendedCourses = () => {
  return (
    <>
      <Typography variant={'h3'} component={'h1'} sx={{ mb: 3 }}>
        Рекомендуемые курсы
      </Typography>
      <CoursesView
        filterOptions={{ professionId: 5 }}
        itemsPerRow={2}
        disabledFilterControls={['professionId']}
      />
    </>
  );
};
