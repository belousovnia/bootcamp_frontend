import { useParams } from 'react-router-dom';
import { ProfessionAbout } from '@features/professions';

export const ProfessionScreen = () => {
  const { id } = useParams();

  return <ProfessionAbout id={id as string} />;
};
