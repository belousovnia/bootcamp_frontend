import { CourseShort } from '@features/courses/cources.entity';
import { CoursesSortBy } from '@features/courses/courses.service';
import { Grid } from '@mui/material';
import { CoursesListCard } from '../CoursesListCard';

interface CoursesListProps {
  items: CourseShort[];
}

export const CoursesList = ({ items }: CoursesListProps) => {
  return (
    <Grid container spacing={4}>
      {items.map((item) => (
        <Grid item xs={12} sm={6} md={4} lg={4} key={item.id}>
          <CoursesListCard {...item} />
        </Grid>
      ))}
    </Grid>
  );
};
