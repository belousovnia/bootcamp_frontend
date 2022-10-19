import {
  getAllProfessions,
  getProfessions,
} from '@features/professions/professions.service';
import { useQuery } from '@tanstack/react-query';

export const useProfessions = () => {
  return useQuery(['professions'], async () => {
    const { data } = await getProfessions();
    return data;
  });
};

export const useAllProfessions = () => {
  return useQuery(['all-professions'], async () => {
    const { data } = await getAllProfessions();
    return data;
  });
};
