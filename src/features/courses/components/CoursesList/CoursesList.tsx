import { Course } from '@features/courses/cources.entity';
import { CoursesSortBy } from '@features/courses/courses.service';
import { Grid } from '@mui/material';
import { CoursesListCard } from '../CoursesListCard';

interface CoursesListProps {
  items: Course[];
}

export const CoursesList = ({ items }: CoursesListProps) => {
  return (
    <Grid container spacing={2}>
      {items.map((item) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
          <CoursesListCard {...item} />
        </Grid>
      ))}
    </Grid>
  );
};
