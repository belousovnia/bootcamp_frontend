import { useCourses } from '@features/courses/hooks/useCourses';
import { Box } from '@mui/material';
import { ReactNode, useState } from 'react';
import { CoursesFilter, FilterOptions } from '../CoursesFilter';
import { CoursesList } from '../CoursesList';

export const CoursesView = () => {
  const [page, setPage] = useState(1);
  const [options, setOptions] = useState<FilterOptions>({
    sortBy: 'date-start',
  });

  const { courses, pagination, error, isLoading } = useCourses(page, options);
  console.log(courses, error, isLoading);

  const handleFilterChange = (filterOptions: FilterOptions) => {
    setOptions(filterOptions);
  };

  return (
    <>
      <CoursesFilter options={{}} onChange={handleFilterChange} />
      {isLoading && <h1>Loading...</h1>}
      {error && <h1>Error</h1>}
      {courses && (
        <Box sx={{ mt: 4 }}>
          <CoursesList items={courses} />
        </Box>
      )}
    </>
  );
};
