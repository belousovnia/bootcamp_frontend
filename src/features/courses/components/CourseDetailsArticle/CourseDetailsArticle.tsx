import { useCourse } from '@features/courses/hooks/useCourse';
import { Alert, Box, CircularProgress, Typography } from '@mui/material';
import { CourseDetailsContent } from '../CourseDetailsContent';
import { CourseDetailsHeader } from '../CourseDetailsHeader';

interface CourseDetailsArticleProps {
  courseId: string;
}

export const CourseDetailsArticle = ({ courseId }: CourseDetailsArticleProps) => {
  const { course, isLoading, error } = useCourse(courseId);

  return (
    <article>
      <>
        {isLoading && (
          <Box sx={{ mt: 2 }}>
            <CircularProgress />
          </Box>
        )}
        {error && (
          <Box sx={{ mt: 3 }}>
            <Alert severity="error">
              Ой! Кажется произошла ошибка. Попробуйте перезагрузить страницу.
            </Alert>
          </Box>
        )}
        {course && (
          <>
            <Box sx={{ mb: 5 }}>
              <CourseDetailsHeader
                complexity={course.complexity}
                title={course.name}
                profession={course.profession}
                dateStart={course.dateStart}
                dateEnd={course.dateEnd}
              />
            </Box>
            <CourseDetailsContent description={course.description} />
          </>
        )}
      </>
    </article>
  );
};
