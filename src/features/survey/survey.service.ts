import { requestService } from '@infrastructure/request';
import { AxiosResponse } from 'axios';
import { Survey } from './survey.entity';

export const fetchSurvey = (): Promise<AxiosResponse<Survey>> => {
  return requestService.get(`survey`);
};

export type CreateSurveyResultsArgs = {
  surveyId: number;
  survey: {
    questionId: number;
    answerId: number;
  }[];
};

export const createSurveyResults = (
  args: CreateSurveyResultsArgs,
): Promise<AxiosResponse> => {
  return requestService.post(`survey/result`, args);
};
