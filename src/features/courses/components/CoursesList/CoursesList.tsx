import { CourseShort } from '@features/courses/cources.entity';
import { CoursesSortBy } from '@features/courses/courses.service';
import { Grid } from '@mui/material';
import { ForwardedRef, forwardRef } from 'react';
import { CoursesListCard } from '../CoursesListCard';

interface CoursesListProps {
  items: CourseShort[];
}

export const CoursesList = forwardRef(function Component(
  props: CoursesListProps,
  ref: ForwardedRef<HTMLDivElement>,
) {
  return (
    <Grid container spacing={4} ref={ref}>
      {props.items.map((item) => (
        <Grid item xs={12} sm={6} md={4} lg={4} key={item.id}>
          <CoursesListCard {...item} />
        </Grid>
      ))}
    </Grid>
  );
});
