import { AxiosResponse } from 'axios';
import { requestService } from '@infrastructure/request';
import { ProfessionsEntity } from '@features/professions/professions.entity';

export const getProfessions = async (): Promise<AxiosResponse<ProfessionsEntity[]>> => {
  return await requestService.get('/getProfessions');
};
