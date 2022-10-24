import { SurveyStartCard } from '@features/survey/components/SurveyStartCard/SurveyStartCard';
import { APP_TITLE_WITH_SEPARATOR } from '@utils/constants';
import { Helmet } from 'react-helmet';

export const SurveyScreen = () => {
  return (
    <>
      <Helmet>
        <title>Подобрать IT профессию {APP_TITLE_WITH_SEPARATOR}</title>
      </Helmet>
      <SurveyStartCard />
    </>
  );
};
