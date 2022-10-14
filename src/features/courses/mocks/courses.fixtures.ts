import { faker } from '@faker-js/faker';
import {
  CourseFull,
  CourseProviderFull,
  CourseProviderShort,
  CourseShort,
} from '../cources.entity';

export const shortCourseFixtures: CourseShort[] = [
  {
    id: faker.datatype.uuid(),
    name: 'Курс по React',
    image: {
      url: 'https://via.placeholder.com/672x320.png?text=Image',
      width: 672,
      height: 320,
    },
    updatedAt: '2021-03-01T00:00:00.000Z',
    dateStart: '2022-10-29T00:00:00.000Z',
    dateEnd: '2023-02-05T00:00:00.000Z',
    profession: {
      id: faker.datatype.uuid(),
      name: 'Программирование',
    },
    provider: {
      id: faker.datatype.uuid(),
      name: 'Skillbox',
      description: 'Описание Skillbox',
      logo: {
        url: 'https://via.placeholder.com/728x90.png?text=Logo',
        width: 144,
        height: 40,
      },
    },
  },
  {
    id: faker.datatype.uuid(),
    name: 'Веб-дизайнер',
    image: {
      url: 'https://unti-prod-cat.s3.dtln.ru/cover/%D0%9D%D0%91_%D0%92%D0%B5%D0%B1_%D0%B4%D0%B8%D0%B7%D0%B0%D0%B9%D0%BD%D0%B5%D1%80.png',
      width: 672,
      height: 320,
    },
    updatedAt: '2021-03-01T00:00:00.000Z',
    dateStart: '2022-10-28T00:00:00.000Z',
    dateEnd: '2023-02-11T00:00:00.000Z',
    profession: {
      id: faker.datatype.uuid(),
      name: 'Программирование',
    },
    provider: {
      id: faker.datatype.uuid(),
      name: 'Skillbox',
      description: 'Описание Skillbox',
      logo: {
        url: 'https://via.placeholder.com/728x90.png?text=Logo',
        width: 144,
        height: 40,
      },
    },
  },
];

export const fullCourseFixture: CourseFull = {
  id: faker.datatype.uuid(),
  name: 'Курс по React',
  description:
    '<p>Неприятностей раз нас справедливости великие неприятностей стремящегося несло лишь умеет разумно тягостными поняли собой потому&nbsp;&mdash; счастливой наслаждений что открывший, и но. Возжаждал действительно назвал иной лишь немалое раз, действительно возжаждал, какими, наслаждений если истину. Открывший этот приносят, из-за откуда потому постигают и, этот такого которого. Никакого само ни, стремящегося никакого некоей eсли упрекнуть восхваляющих: возлюбил, такие этот если избегал раз людей обстоятельства этот некое что это упражнениями, раскрою. Предпочел людей возлюбил из-за возникает кто этот нас заниматься нас, никого счастливой мог: вами нас умеет людей великие такие какими. Справедливости, равно заниматься, говорил: несло никаких eсли наслаждению, упрекнуть&nbsp;&mdash; несло, немалое стал лишь из но лишь всю ни, картину человек.</p><p>Лишь такого и нет равно, восхваляющих из-за приносило бы великие откуда человек, наслаждения воспользоваться стремящегося: избегал восхваляющих превратное: откуда приносило откуда человек кто великие. Некоей кто, справедливости или когда, страдания, за возникают открывший, именно вы eсли физическими за никаких какими которое отвергает.</p><p>Нет бы: действительно разъясню картину простейшим зодчим именно пользы наслаждений раскрою или. Было наслаждение разумно из этот мог восхваляющих: стремящегося великие боль: вами, того никакого возжаждал которое возникают. Физическими по предпочел физическими приносило боль поняли умеет: людей ни возникает когда упражнениями которого поняли некоей нет: простейшим наслаждению картину отвергает.</p><p>За говорил eсли, немалое действительно постигают лишь потому человек представление немалое за откуда из-за как примером и только жизни неприятностей а возлюбил представление&nbsp;&mdash; говорил. Справедливости никого открывший само избегал это страдания, боль вами картину никто. Немалое обстоятельства наслаждения какими бы представление боль назвал стремящегося нас это этот было пользы истину. Некое возникает не порицающих: мог раз обстоятельства наслаждение, простейшим умеет несло кто поняли наслаждению&nbsp;&mdash; никого картину, человек перед боль избегает постигают. Отвергает воспользоваться&nbsp;&mdash; наслаждение: некоей умеет: вы истину действительно стал разумно было тех возлюбил с&nbsp;&mdash; за предпочел поняли этот некое восхваляющих наслаждений презирает. Представление бы откуда боль обстоятельства с жизни бы вами, это такие какими.</p><p>За я лишь я ни немалое, мог возжаждал некоей назвал некое никаких возлюбил воспользоваться вами предпочел а которое кто, из-за. Собой никакого всю превратное которого счастливой жизни я по лишь вами&nbsp;&mdash; назвал поняли: раз возжаждал того кто это именно. Некое такого по возлюбил говорил перед умеет из возжаждал восхваляющих раскрою&nbsp;&mdash; боль eсли счастливой из-за тех нет несло само стремящегося, eсли такого постигают из-за с. Предпочел великие картину возникает никто именно когда это, или лишь какими.</p><p>Я действительно некоей только представление страдания вы если лишь поняли такие когда заниматься нет обстоятельства картину бы разъясню жизни говорил приносило немалое если. Того наслаждения предаваться и стал когда превратное с, действительно порицающих никого я нас тех&nbsp;&mdash; нас из-за такие. Нет назвал поняли а, то только иной разумно, предпочел, мог потому того всю некое того кто. Такого потому что раскрою лишь разъясню возникает: порицающих никто неприятностей поняли.</p> ',
  provider: {
    id: faker.datatype.uuid(),
    name: 'Мобильное электронное образование',
    description: 'Описание',
    logo: {
      url: 'https://gu-st.ru/landings-st/assets/svg/discount-courses/organizations/mobile-education.svg',
      width: 144,
      height: 40,
    },
  },
  image: {
    url: 'https://unti-prod-cat.s3.dtln.ru/cover/%D0%9D%D0%91_%D0%92%D0%B5%D0%B1_%D0%B4%D0%B8%D0%B7%D0%B0%D0%B9%D0%BD%D0%B5%D1%80.png',
    width: 672,
    height: 320,
  },
  complexity: {
    id: faker.datatype.uuid(),
    name: 'Для новичков',
  },
  updatedAt: '2021-03-01T00:00:00.000Z',
  dateStart: '2022-10-29T00:00:00.000Z',
  dateEnd: '2023-02-05T00:00:00.000Z',
  profession: {
    id: faker.datatype.uuid(),
    name: 'Программист',
  },
};

export const courseProviderFullFixture: CourseProviderFull = {
  id: faker.datatype.uuid(),
  name: 'Мобильное электронное образование',
  url: 'http://habr.ru',
  coverUrl:
    'https://www.silvermedia.ru/upload/resize_cache/iblock/196/75_75_1/2800374.jpg',
  shortDescription: 'Краткое описание',
  description: 'Описание',
};

export const generateShortCourses = (count: number): CourseShort[] => {
  return Array.from({ length: count }, () => {
    return {
      id: faker.datatype.uuid(),
      name: faker.lorem.words(2),
      image: {
        url: 'http://placekitten.com/g/672/320',
        width: 672,
        height: 320,
      },
      updatedAt: '2021-03-01T00:00:00.000Z',
      dateStart: faker.date
        .between('2022-10-28T00:00:00.000Z', '2023-01-01T00:00:00.000Z')
        .toISOString(),
      dateEnd: faker.date
        .between('2023-02-28T00:00:00.000Z', '2023-08-11T00:00:00.000Z')
        .toISOString(),
      profession: {
        id: faker.datatype.uuid(),
        name: 'Программирование',
      },
      provider: {
        id: faker.datatype.uuid(),
        name: faker.lorem.word(),
        description: 'Описание Skillbox',
        logo: {
          url: 'https://via.placeholder.com/728x90.png?text=Logo',
          width: 144,
          height: 40,
        },
      },
    };
  });
};

export const generateShortCourseProviders = (count: number): CourseProviderShort[] => {
  return Array.from({ length: count }, () => {
    return {
      id: faker.datatype.uuid(),
      name: faker.lorem.words(2),
    };
  });
};
