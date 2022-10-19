import {
  getAllProfessions,
  getProfession,
  getProfessions,
  ProfessionsAllResponse,
} from '@features/professions/professions.service';
import { useQuery } from '@tanstack/react-query';

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

export const useProfession = (id: string) => {
  return useQuery(['profession'], async () => {
    const { data } = await getProfession(id);
    return data;
  });
};
