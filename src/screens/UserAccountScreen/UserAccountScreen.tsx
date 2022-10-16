import { UserAccount } from '@features/users/components/UserAccount';
import { APP_TITLE_WITH_SEPARATOR } from '@utils/constants';
import { Helmet } from 'react-helmet';

export const UserAccountScreen = () => {
  return (
    <>
      <Helmet>
        <title>Мой аккаунт {APP_TITLE_WITH_SEPARATOR}</title>
      </Helmet>
      <UserAccount />
    </>
  );
};
