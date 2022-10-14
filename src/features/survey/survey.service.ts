import { requestService } from '@infrastructure/request';
import { AxiosResponse } from 'axios';
import { Survey } from './survey.entity';

export const fetchSurvey = (): Promise<AxiosResponse<Survey>> => {
  return requestService.get(`survey`);
};
