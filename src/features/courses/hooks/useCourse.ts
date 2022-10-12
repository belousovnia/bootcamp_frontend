import { useQuery } from '@tanstack/react-query';
import { FilterOptions } from '../components/CoursesFilter';
import { fetchCourse, fetchCourses } from '../courses.service';

export const useCourse = (id: string) => {
  const { data, error, isLoading } = useQuery(['course', id], () => fetchCourse({ id }));

  return {
    course: data?.course,
    error,
    isLoading,
  };
};
