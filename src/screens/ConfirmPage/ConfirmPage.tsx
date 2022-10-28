import { useParams } from 'react-router-dom';
import { ConfirmEmail } from '@features/auth/components';
import { Helmet } from 'react-helmet';
import { APP_TITLE_WITH_SEPARATOR } from '@utils/constants';

export const ConfirmPage = () => {
  const { token } = useParams();

  return (
    <>
      <Helmet>
        <title>Подтверждение почты {APP_TITLE_WITH_SEPARATOR}</title>
      </Helmet>
      <ConfirmEmail token={token as string} />;
    </>
  );
};
