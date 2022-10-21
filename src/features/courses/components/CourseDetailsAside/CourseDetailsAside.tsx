import { useCourse } from '@features/courses/hooks/useCourse';
import {
  Box,
  Button,
  Card,
  CircularProgress,
  Stack,
  styled,
  Typography,
} from '@mui/material';
import { Link } from 'react-router-dom';

interface CourseDetailsAsideProps {
  courseId: string;
}

const ImgWrapper = styled('div')(() => ({
  width: '100%',
  height: '100px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
}));

const CourseProviderCoverImg = styled('img')(() => ({
  width: '100%',
  height: '100%',
  objectFit: 'contain',
  position: 'absolute',
}));

export const CourseDetailsAside = ({ courseId }: CourseDetailsAsideProps) => {
  const { course } = useCourse(courseId);
  return (
    <aside>
      <>
        {course && (
          <Stack spacing={8} direction="column">
            <Box>
              <Typography component={'h5'} variant="h6" marginBottom={2}>
                Создатель курса
              </Typography>
              <Card sx={{ p: 3 }}>
                <ImgWrapper>
                  <CourseProviderCoverImg
                    alt={course.providerName}
                    src={course.providerCoverUrl}
                  />
                </ImgWrapper>
              </Card>
            </Box>
            <Box>
              <Typography component={'h5'} variant="h6" sx={{ mb: 2 }}>
                Ссылка на курс
              </Typography>
              <Button variant="outlined" size="large" component={'a'} href={course.url}>
                Открыть курс
              </Button>
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
