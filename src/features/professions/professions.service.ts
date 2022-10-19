import { AxiosResponse } from 'axios';
import { requestService } from '@infrastructure/request';
import {
  ProfessionEntity,
  ProfessionsAllResponse,
} from '@features/professions/professions.entity';
import { PaginatedResult } from '@infrastructure/types';

type ProfessionsListResponse = PaginatedResult<ProfessionEntity>;

export const getProfessions = async (): Promise<
  AxiosResponse<ProfessionsListResponse>
> => {
  return await requestService.get('/v1/professions');
};

export const getAllProfessions = async (): Promise<
  AxiosResponse<ProfessionsAllResponse>
> => {
  return await requestService.get('/v1/professions/all');
};

export const getProfession = async (
  id: string,
): Promise<AxiosResponse<ProfessionEntity>> => {
  return await requestService.get(`/v1/professions/${id}`);
};
