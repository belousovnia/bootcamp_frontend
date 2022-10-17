import { CourseProfession } from '@features/courses/cources.entity';
import { Grid, Typography } from '@mui/material';
import dayjs from 'dayjs';

interface CourseDetailsHeaderProps {
  title: string;
  isForAdvancedStudents: boolean;
  profession: string;
  dateStart: string;
  dateEnd: string;
}

export const CourseDetailsHeader = ({
  title,
  isForAdvancedStudents,
  profession,
  dateStart,
  dateEnd,
}: CourseDetailsHeaderProps) => {
  const formattedDateStart = dayjs(dateStart).format('DD.MM.YYYY');
  const formattedDateEnd = dayjs(dateEnd).format('DD.MM.YYYY');
  return (
    <header>
      <Typography component={'h1'} variant="h3">
        {title}
      </Typography>
      <Grid container spacing={2} marginTop={1}>
        <Grid item xs={12} sm={6} md={4}>
          <Typography component={'h5'} variant="h6">
            Дата проведения:
          </Typography>
          <Typography component={'p'} variant="subtitle1">
            {formattedDateStart} - {formattedDateEnd}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Typography component={'h5'} variant="h6">
            Сложность:
          </Typography>
          <Typography component={'p'} variant="subtitle1">
            {isForAdvancedStudents ? 'Для продвинутых' : 'Для начинающих'}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Typography component={'h5'} variant="h6">
            Профессия:
          </Typography>
          <Typography component={'p'} variant="subtitle1">
            {profession}
          </Typography>
        </Grid>
      </Grid>
    </header>
  );
};
