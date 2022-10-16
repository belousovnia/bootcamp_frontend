import { Typography } from '@mui/material';
import { APP_TITLE_WITH_SEPARATOR } from '@utils/constants';
import { Helmet } from 'react-helmet';

const PAGE_TITLE = 'Как получить финансирование на обучение';

export const FinanceStaticPage = () => {
  return (
    <>
      <Helmet>
        <title>
          {PAGE_TITLE} {APP_TITLE_WITH_SEPARATOR}
        </title>
      </Helmet>
      <article>
        <Typography component={'h1'} variant="h3">
          {PAGE_TITLE}
        </Typography>
        <h2>Привет</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid neque corrupti
          itaque repellendus voluptatem illo minus, omnis dicta voluptatibus optio atque
          iusto molestiae perspiciatis vitae explicabo ut dolores, ratione at.
        </p>
        <ul>
          <li>asd</li>
          <li>fda</li>
          <li>Привет</li>
        </ul>
      </article>
    </>
  );
};
