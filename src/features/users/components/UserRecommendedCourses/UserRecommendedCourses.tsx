import { CoursesView } from '@features/courses/components/CoursesView';
import { Typography } from '@mui/material';

export const UserRecommendedCourses = ({ professionId }: { professionId: number }) => {
  return (
    <>
      <Typography variant={'h3'} component={'h1'} sx={{ mb: 3 }}>
        Рекомендуемые курсы
      </Typography>
      <CoursesView
        filterOptions={{ professionId: professionId }}
        itemsPerRow={2}
        disabledFilterControls={['professionId']}
      />
    </>
  );
};
