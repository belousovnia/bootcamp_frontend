import { useQuery } from '@tanstack/react-query';
import { FilterOptions } from '../components/CoursesFilter';
import { fetchCourses } from '../courses.service';

export const useCourses = (page: number, opts: FilterOptions) => {
  const { data, error, isLoading } = useQuery(['courses', page, opts], () =>
    fetchCourses({ page: page.toString(), ...opts }),
  );

  return {
    courses: data?.courses,
    pagination: data?.pagination,
    error,
    isLoading,
  };
};
