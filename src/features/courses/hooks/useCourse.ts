import { useQuery } from '@tanstack/react-query';
import { fetchCourse } from '../courses.service';

export const useCourse = (id: string) => {
  const { data, error, isLoading } = useQuery(['course', id], async () => {
    const { data } = await fetchCourse({ id });
    return data;
  });

  return {
    course: data?.course,
    error,
    isLoading,
  };
};
