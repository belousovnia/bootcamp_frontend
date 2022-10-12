import { useParams } from 'react-router-dom';
import { FinanceStaticPage } from './pages/FinanceStaticPage';

export const PageScreen = () => {
  const { slug } = useParams();

  return <div>{slug === 'finance' && <FinanceStaticPage />}</div>;
};
