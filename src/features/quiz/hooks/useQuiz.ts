import { useQuery } from '@tanstack/react-query';
import { Quiz } from '../quiz.entity';

export const useQuiz = () => {
  const { data, error, isLoading } = useQuery<Quiz, Error>(['quiz'], () => {
    return fetch('/quiz').then((res) => res.json());
  });

  return { data, error, isLoading };
};
