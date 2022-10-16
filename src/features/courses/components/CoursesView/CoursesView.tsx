import { useCourses } from '@features/courses/hooks/useCourses';
import { Alert, Box, CircularProgress, Link, Pagination } from '@mui/material';
import { ContainerLoader } from '@ui-library/components/ContainerLoader';
import { MouseEventHandler, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CoursesFilter, FilterOptions } from '../CoursesFilter';
import { CoursesList } from '../CoursesList';

export const CoursesView = () => {
  const navigate = useNavigate();
  const coursesListRef = useRef<HTMLDivElement>(null);

  const [page, setPage] = useState(1);
  const [options, setOptions] = useState<FilterOptions>({
    sortBy: 'date-start',
    search: '',
  });

  const { courses, pagination, error, isLoading, isFetching } = useCourses(page, options);

  const handleFilterChange = (filterOptions: FilterOptions) => {
    setOptions((prev) => ({ ...prev, ...filterOptions }));
  };

  const clearFilters: MouseEventHandler<HTMLAnchorElement> = (e) => {
    e.preventDefault();
    setOptions({ sortBy: 'date-start', search: '' });
  };

  useEffect(() => {
    if (coursesListRef.current) {
      coursesListRef.current.scrollIntoView();
    }
  }, [page]);

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
        <>
          <Box sx={{ mt: 4 }}>
            <ContainerLoader isLoading={isFetching}>
              <CoursesList items={courses} ref={coursesListRef} />
            </ContainerLoader>
          </Box>
          {pagination && (
            <Box sx={{ mt: 4, justifyContent: 'center', display: 'flex' }}>
              <Pagination
                count={pagination.totalPages}
                page={page}
                shape="rounded"
                variant="outlined"
                onChange={(_, value) => setPage(value)}
              />
            </Box>
          )}
        </>
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
