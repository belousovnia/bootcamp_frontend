import { useCourse } from '@features/courses/hooks/useCourse';
import { Box, Button, Card, CircularProgress, Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

interface CourseDetailsAsideProps {
  courseId: string;
}

export const CourseDetailsAside = ({ courseId }: CourseDetailsAsideProps) => {
  const { course, isLoading, error } = useCourse(courseId);
  return (
    <aside>
      <>
        {isLoading && (
          <Box sx={{ mt: 2 }}>
            <CircularProgress />
          </Box>
        )}
        {course && (
          <Stack spacing={8} direction="column">
            <Box>
              <Typography component={'h5'} variant="h6" marginBottom={2}>
                Создатель курса
              </Typography>
              <Card>
                <img
                  alt={course.provider.name}
                  width={288}
                  height={76}
                  src={course.provider.logo.url}
                  style={{ width: '100%', height: 'auto' }}
                ></img>
              </Card>
            </Box>
            <Box>
              <Typography
                component={'h5'}
                variant="h6"
                marginBottom={2}
                sx={{ maxWidth: { md: 270, lineHeight: 1.4 } }}
              >
                Информация по бесплатному обучению
              </Typography>
              <Button
                variant="contained"
                size="large"
                component={Link}
                to="/pages/finance"
                sx={{ textAlign: 'center', py: 2 }}
                fullWidth
              >
                Как пройти курсы бесплатно
              </Button>
            </Box>
          </Stack>
        )}
      </>
    </aside>
  );
};
