import { AxiosResponse } from 'axios';
import { requestService } from '@infrastructure/request';
import { ProfessionsEntity } from '@features/professions/professions.entity';
import { PaginatedResult } from '@infrastructure/types';

type ProfessionsListResponse = PaginatedResult<ProfessionsEntity>;

export const getProfessions = async (): Promise<
  AxiosResponse<ProfessionsListResponse>
> => {
  return await requestService.get('/v1/professions');
};

export type ProfessionsAllResponse = ProfessionsEntity[];

export const getAllProfessions = async (): Promise<
  AxiosResponse<ProfessionsAllResponse>
> => {
  return await requestService.get('/v1/professions/all');
};
