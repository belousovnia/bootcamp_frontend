import { SurveyStepCard } from '@features/survey/components/SurveyStepCard';
import { APP_TITLE_WITH_SEPARATOR } from '@utils/constants';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';

export const SurveyStepScreen = () => {
  const { step } = useParams();
  return (
    <>
      <Helmet>
        <title>
          {' '}
          Тестирование вопрос {step} {APP_TITLE_WITH_SEPARATOR}
        </title>
      </Helmet>
      <SurveyStepCard />
    </>
  );
};
