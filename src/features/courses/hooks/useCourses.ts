import { useQuery } from '@tanstack/react-query';
import { FilterOptions } from '../components/CoursesFilter';
import { fetchCourses } from '../courses.service';

export const useCourses = (page: number, opts: FilterOptions) => {
  const { data, error, isLoading } = useQuery(['courses', page, opts], async () => {
    const { data } = await fetchCourses({ page: page.toString(), ...opts });
    return data;
  });

  return {
    courses: data?.courses,
    pagination: data?.pagination,
    error,
    isLoading,
  };
};
