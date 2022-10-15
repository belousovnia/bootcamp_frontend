import { APP_TITLE_WITH_SEPARATOR } from '@utils/constants';
import { Helmet } from 'react-helmet';
import { MainPromoSection } from './components/MainPromoSection';

export const MainScreen = () => {
  return (
    <>
      <Helmet>
        <title>Главная {APP_TITLE_WITH_SEPARATOR}</title>
      </Helmet>
      <MainPromoSection />
    </>
  );
};
