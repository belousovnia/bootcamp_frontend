import React from 'react';
import { ProfessionsEntity } from '@features/professions/professions.entity';

interface ProfessionCardProps {
  profession: ProfessionsEntity;
}

export const ProfessionCard: React.FC<ProfessionCardProps> = ({ profession }) => {
  return <article>{profession.name}</article>;
};
