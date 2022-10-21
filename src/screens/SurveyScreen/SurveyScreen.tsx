import { Registration, useAuthStore } from '@features/auth';
import { SurveyStartCard } from '@features/survey/components/SurveyStartCard/SurveyStartCard';
import { APP_TITLE_WITH_SEPARATOR } from '@utils/constants';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';

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
