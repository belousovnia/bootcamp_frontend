import { requestService } from '@infrastructure/request';
import { useQuery } from '@tanstack/react-query';
import { Survey } from '../survey.entity';

export const useSurvey = () => {
  const { data, error, isLoading } = useQuery<Survey, Error>(['survey'], async () => {
    const { data } = await requestService.get(`survey`);
    return data;
  });

  return { data, error, isLoading };
};
