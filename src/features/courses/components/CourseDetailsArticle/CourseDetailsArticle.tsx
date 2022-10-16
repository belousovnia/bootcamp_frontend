import { useCourse } from '@features/courses/hooks/useCourse';
import { Alert, Box, Button, CircularProgress } from '@mui/material';
import { APP_TITLE_WITH_SEPARATOR } from '@utils/constants';
import { useState } from 'react';
import { Helmet } from 'react-helmet';
import { CourseDetailsContent } from '../CourseDetailsContent';
import { CourseDetailsHeader } from '../CourseDetailsHeader';

interface CourseDetailsArticleProps {
  courseId: string;
}

export const CourseDetailsArticle = ({ courseId }: CourseDetailsArticleProps) => {
  const [isDescriptionTruncated, setDescriptionTruncated] = useState(true);
  const { course, isLoading, error } = useCourse(courseId);

  const truncationText = isDescriptionTruncated ? 'Раскрыть описание' : 'Скрыть описание';

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
            <Helmet>
              <title>
                {course.name} {APP_TITLE_WITH_SEPARATOR}
              </title>
            </Helmet>
            <Box sx={{ mb: 5 }}>
              <CourseDetailsHeader
                isForAdvancedStudents={course.isForAdvancedStudents}
                title={course.name}
                profession={course.profession}
                dateStart={course.startMskDateTime}
                dateEnd={course.endMskDateTime}
              />
            </Box>
            <CourseDetailsContent
              description={course.description}
              isTruncated={isDescriptionTruncated}
            />
            <Button onClick={() => setDescriptionTruncated((p) => !p)}>
              {truncationText}
            </Button>
          </>
        )}
        {error && (
          <Box sx={{ mt: 3 }}>
            <Alert severity="error">
              Ой! Кажется произошла ошибка. Попробуйте перезагрузить страницу.
            </Alert>
          </Box>
        )}
      </>
    </article>
  );
};
