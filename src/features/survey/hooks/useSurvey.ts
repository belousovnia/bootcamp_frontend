import { requestService } from '@infrastructure/request';
import { useQuery } from '@tanstack/react-query';
import { Survey } from '../survey.entity';
import { fetchSurvey } from '../survey.service';

export const useSurvey = () => {
  const { data, error, isLoading } = useQuery<Survey, Error>(['survey'], async () => {
    const { data } = await fetchSurvey();
    return data;
  });

  return { data, error, isLoading };
};
