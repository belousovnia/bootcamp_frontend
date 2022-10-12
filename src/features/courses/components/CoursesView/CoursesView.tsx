import { useCourses } from '@features/courses/hooks/useCourses';
import { Alert, Box, CircularProgress, Link } from '@mui/material';
import { MouseEventHandler, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CoursesFilter, FilterOptions } from '../CoursesFilter';
import { CoursesList } from '../CoursesList';

export const CoursesView = () => {
  const navigate = useNavigate();

  const [page, setPage] = useState(1);
  const [options, setOptions] = useState<FilterOptions>({
    sortBy: 'date-start',
    search: '',
  });

  const { courses, pagination, error, isLoading } = useCourses(page, options);

  const handleFilterChange = (filterOptions: FilterOptions) => {
    setOptions((prev) => ({ ...prev, ...filterOptions }));
  };

  const clearFilters: MouseEventHandler<HTMLAnchorElement> = (e) => {
    e.preventDefault();
    setOptions({ sortBy: 'date-start', search: '' });
  };

  return (
    <>
      <CoursesFilter options={options} onChange={handleFilterChange} />
      {isLoading && !courses && (
        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
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
      {courses && courses.length > 0 && (
        <Box sx={{ mt: 4, opacity: isLoading ? 0.5 : 1 }}>
          <CoursesList items={courses} />
        </Box>
      )}
      {courses && courses.length === 0 && (
        <Box sx={{ mt: 3 }}>
          <Alert severity="info">
            К сожалению, курсы по заданым фильтрам не найдены.{' '}
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid*/}
            <Link
              variant="body2"
              color={'inherit'}
              component="button"
              onClick={clearFilters}
            >
              Очистить фильтры
            </Link>
          </Alert>
        </Box>
      )}
    </>
  );
};
