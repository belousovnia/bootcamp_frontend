import { useQuery } from '@tanstack/react-query';
import { Survey } from '../survey.entity';

export const useSurvey = () => {
  const { data, error, isLoading } = useQuery<Survey, Error>(['survey'], () => {
    return fetch('/api/survey').then((res) => res.json());
  });

  return { data, error, isLoading };
};
