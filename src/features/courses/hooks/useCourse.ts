import { useQuery } from '@tanstack/react-query';
import { CourseFull } from '../cources.entity';
import { fetchCourse } from '../courses.service';

export const useCourse = (id: string) => {
  const { data, error, isLoading } = useQuery<CourseFull, Error>(
    ['course', id],
    async () => {
      const { data } = await fetchCourse({ id });
      return data;
    },
  );

  return {
    course: data,
    error,
    isLoading,
  };
};
