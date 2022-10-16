import { UserRecommendations } from '@features/users/components/UserRecommendations';
import { APP_TITLE_WITH_SEPARATOR } from '@utils/constants';
import { Helmet } from 'react-helmet';

export const UserRecommendationsScreen = () => {
  return (
    <>
      <Helmet>
        <title>Мои рекомендации {APP_TITLE_WITH_SEPARATOR}</title>
      </Helmet>
      <UserRecommendations />
    </>
  );
};
