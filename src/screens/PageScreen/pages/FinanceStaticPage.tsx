import { Typography } from '@mui/material';
import { TypographyContainer } from '@ui-library/components/TypographyContainer';
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
        <Typography component={'h1'} variant="h3" sx={{ mb: 3 }}>
          {PAGE_TITLE}
        </Typography>
        <TypographyContainer>
          <p>
            Для получения полной компенсации затрат на обучение по дополнительной
            образовательной программе необходимо:
          </p>
          <ul>
            <li>выбрать курс, на котором хотите обучаться;</li>
            <li>заполнить заявку на обучение на сайте владельца курса;</li>
            <li>
              заполнить анкету на портале gosuslugi.ru, чтобы проверить право на участие в
              проекте;
            </li>
            <li>дождаться подтверждения;</li>
            <li>пройти обучение и получить документ о дополнительном образовании.</li>
          </ul>
          <p>
            Требования к участникам: Учиться со скидкой могут граждане, являющиеся
            пенсионерами по достижении пенсионного возраста или вышедшие на пенсию по
            выслуге лет.
          </p>
          <p>
            Сроки рассмотрения анкеты:
            <br />
            Проверка анкеты занимает до 20 рабочих дней В случае положительного решения в
            срок до 5 рабочих дней после его принятия на вашу электронную почту придёт
            сообщение со ссылкой на сайт владельца курса. После подтверждения права на
            участие в проекте общение по заключению договора со слушателем ведёт
            образовательная организация. У каждой образовательной организации свои сроки
            рассмотрения одобренных заявок. Максимальное время рассмотрения заявки — 30
            дней, минимальное — 1 день
          </p>
          <p>Обращаем Ваше внимание, что записаться можно только на один курс!</p>
        </TypographyContainer>
      </article>
    </>
  );
};
