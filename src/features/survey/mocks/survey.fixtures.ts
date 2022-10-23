import { faker } from '@faker-js/faker';
import { Survey } from '../survey.entity';

export const surveyFixture: Survey = {
  surveyId: 1,
  title: 'Подобрать IT Профессию',
  description:
    'Ответьте на 10 вопросов и узнайте наиболее подходящее для вас IT направление',
  survey: [
    {
      question: 'Какой урок у вас был любимым в школе?',
      questionId: 10,
      answers: [
        {
          text: 'Литература',
          answerId: 100,
        },
        {
          text: 'ИЗО',
          answerId: 101,
        },
        {
          text: 'Математика',
          answerId: 102,
        },
        {
          text: 'Физика',
          answerId: 103,
        },
        {
          text: 'Физкультура',
          answerId: 104,
        },
      ],
    },
    {
      question: 'А какие хобби у вас сейчас?',
      questionId: 11,
      answers: [
        {
          text: 'Кроссворды и чтение книг',
          answerId: 105,
        },
        {
          text: 'Вышивка крестиком',
          answerId: 106,
        },
        {
          text: 'Игра в комьютерные игры',
          answerId: 107,
        },
        {
          text: 'Ломаю всякие вещи: автомобиль, бытовую технику',
          answerId: 108,
        },
        {
          text: 'Посадка растений в огороде',
          answerId: 109,
        },
      ],
    },
    {
      question: 'Какую литературу предпочитаете?',
      questionId: 12,
      answers: [
        {
          text: 'Художественную, чаще всего классическую',
          answerId: 110,
        },
        {
          text: 'Постмодернизм, наверное',
          answerId: 111,
        },
        {
          text: 'Самоучители, пособия - то, что пригодится в жизни',
          answerId: 112,
        },
        {
          text: 'Ой, да всего понемножку - самоучители, пособия, то, что пригодится в жизни',
          answerId: 113,
        },
        {
          text: 'Инструкции к бытовой технике',
          answerId: 114,
        },
      ],
    },
    {
      questionId: 13,
      question:
        'Вы совершили ошибку в работе, и начальник вызывает вас к себе и ругается. Ваши действия?',
      answers: [
        {
          text: 'Заболтаю начальника так, что он забудет, зачем звал',
          answerId: 115,
        },
        {
          text: 'Исправлять ничего не буду, сделаю так, чтобы ошибка не бросалась в глаза',
          answerId: 116,
        },
        {
          text: 'Молча всё исправлю',
          answerId: 117,
        },
        {
          text: 'Укажу на то, что это не моя ошибка',
          answerId: 118,
        },
        {
          text: 'Найду, кто что-то нажал и всё сломалось',
          answerId: 119,
        },
      ],
    },
    {
      question: 'Что, на ваш взгляд, надо сделать, чтобы получить повышение?',
      questionId: 14,
      answers: [
        {
          text: 'Дружить со всеми',
          answerId: 120,
        },
        {
          text: 'Предлагать необычные решения проблем',
          answerId: 121,
        },
        {
          text: 'Много и усерно работать',
          answerId: 122,
        },
        {
          text: 'Стучать на других',
          answerId: 123,
        },
        {
          text: 'Играть с начальником в контр-страйк и давать ему выиграть',
          answerId: 124,
        },
      ],
    },
    {
      question: 'О каких карьерных достижениях вы мечтаете?',
      questionId: 15,
      answers: [
        {
          text: 'Да плевать на эту карьеру, у меня другие цели',
          answerId: 125,
        },
        {
          text: 'Создать нечто великое',
          answerId: 126,
        },
        {
          text: 'Напишу крутую игру или сделаю новую операционную систему',
          answerId: 127,
        },
        {
          text: 'Стать самым незаменимым сотрудником в коллективе',
          answerId: 128,
        },
        {
          text: 'Стать большим начальником, конечно',
          answerId: 129,
        },
      ],
    },
    {
      questionId: 16,
      question:
        'У вас дедлайн, и вы не успеваете в срок. Кажется, придется ночевать на работе…',
      answers: [
        {
          text: 'Это отличный способ сблизиться с коллегами - закажу пиццу на всех',
          answerId: 130,
        },
        {
          text: 'Возьму больничный, я на переработку не подписывался',
          answerId: 131,
        },
        {
          text: 'Я и так по ночам работаю и всегда дедлайны. Не удивили',
          answerId: 132,
        },
        {
          text: 'Приду, но разовью имитацию бурной деятельности, чтобы другие не поняли, что я виноват в срыве сроков',
          answerId: 133,
        },
        {
          text: 'Ничего, куплю много энергетиков и кофе, ночь длинная',
          answerId: 134,
        },
      ],
    },
    {
      question: 'Коллега уехал в отпуск и оставил вам свою работу. Что будете делать?',
      questionId: 17,
      answers: [
        {
          text: 'Составлю график, чтобы всё успеть',
          answerId: 135,
        },
        {
          text: 'Быстро выполню все задачи и попрошу назначить мне ещё',
          answerId: 136,
        },
        {
          text: 'Официально меня на замещение не ставили, пусть другие и занимаются этим',
          answerId: 137,
        },
        {
          text: 'Попрошу других помочь мне',
          answerId: 138,
        },
        {
          text: 'Как обычно! Я и так ничего не успеваю',
          answerId: 139,
        },
      ],
    },
    {
      question: 'Ладно, а если вы сами поедете в отпуск, как его проведете?',
      questionId: 18,
      answers: [
        {
          text: 'Отправлюсь в путешествие по европейским деревушкам',
          answerId: 140,
        },
        {
          text: 'Сделаю что-нибудь экстремальное - на Эльбрус залезу или с парашютом прыгну',
          answerId: 141,
        },
        {
          text: 'Уеду к бабушке на дачу',
          answerId: 142,
        },
        {
          text: 'Пляж, море, песок',
          answerId: 143,
        },
        {
          text: 'На диване полежу',
          answerId: 144,
        },
      ],
    },
    {
      questionId: 19,
      question:
        'Менеджер проекта, в котором вы участвовали, попал в больницу. Сроки горят, и вам предложили заменить его. Что думаете?',
      answers: [
        {
          text: 'Взвешу все за и против. Я к этому не стремлюсь, но ведь отличная возможность...',
          answerId: 145,
        },
        {
          text: 'Попытаюсь тихо отказать. Или буду тянуть с ответом, чтобы назначили кого-то другого...',
          answerId: 146,
        },
        {
          text: 'Я и так на себе весь проект тащу, пусть другого дурачка поищут',
          answerId: 147,
        },
        {
          text: 'Ого, круто! Или не круто... Подумаю, соглашаться ли',
          answerId: 148,
        },
        {
          text: 'Пффф, а как вы думаете он в больницу попал? Шучу, мне просто повезло',
          answerId: 149,
        },
      ],
    },
  ],
};
