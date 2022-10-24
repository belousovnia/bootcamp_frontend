import { CourseFull } from '@features/courses/cources.entity';
import { Grid } from '@mui/material';
import { ForwardedRef, forwardRef } from 'react';
import { CoursesListCard } from '../CoursesListCard';

interface CoursesListProps {
  items: CourseFull[];
  itemsPerRow?: number;
}

export const CoursesList = forwardRef(function Component(
  { items, itemsPerRow = 3 }: CoursesListProps,
  ref: ForwardedRef<HTMLDivElement>,
) {
  const gridSize = 12 / itemsPerRow;

  return (
    <Grid container spacing={4} ref={ref}>
      {items.map((item) => (
        <Grid item xs={12} sm={6} md={gridSize} lg={gridSize} key={item.id}>
          <CoursesListCard {...item} />
        </Grid>
      ))}
    </Grid>
  );
});
