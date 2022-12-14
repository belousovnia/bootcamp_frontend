import {
  getAllProfessions,
  getProfession,
  getProfessions,
} from '@features/professions/professions.service';
import { QueryKey, useQuery, UseQueryOptions } from '@tanstack/react-query';
import {
  ProfessionEntity,
  ProfessionsAllResponse,
} from '@features/professions/professions.entity';

export const useProfessions = () => {
  return useQuery(['professions'], async () => {
    const { data } = await getProfessions();
    return data;
  });
};

export const useAllProfessions = () => {
  return useQuery<ProfessionsAllResponse, Error>(['all-professions'], async () => {
    const { data } = await getAllProfessions();
    return data;
  });
};

export const useProfession = (
  id: string,
  queryOptions?: Omit<
    UseQueryOptions<ProfessionEntity, Error, ProfessionEntity, QueryKey>,
    'queryKey' | 'queryFn' | 'initialData'
  > & { initialData?: () => undefined },
) => {
  return useQuery<ProfessionEntity, Error>(
    ['profession', id],
    async () => {
      const { data } = await getProfession(id);
      return data;
    },
    queryOptions,
  );
};
