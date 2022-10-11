import { faker } from '@faker-js/faker';
import { Course } from '../cources.entity';

export const courseFixtures: Course[] = [
  {
    id: faker.datatype.uuid(),
    name: 'Курс по React',
    image: {
      url: 'https://via.placeholder.com/672x320.png?text=Image',
      width: 672,
      height: 320,
    },
    tags: [
      {
        id: faker.datatype.uuid(),
        name: faker.lorem.word(),
      },
      {
        id: faker.datatype.uuid(),
        name: faker.lorem.word(),
      },
    ],
    description: 'Описание курса по React',
    updatedAt: '2021-03-01T00:00:00.000Z',
    innerRating: 4.5,
    isProfessional: true,
    isArchived: false,
    dateStart: '2022-10-29T00:00:00.000Z',
    dateEnd: '2023-02-11T00:00:00.000Z',
    direction: {
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
    tags: [
      {
        id: faker.datatype.uuid(),
        name: faker.lorem.word(),
      },
      {
        id: faker.datatype.uuid(),
        name: faker.lorem.word(),
      },
    ],
    description: 'Описание курса по React',
    updatedAt: '2021-03-01T00:00:00.000Z',
    innerRating: 4.5,
    isProfessional: true,
    isArchived: false,
    dateStart: '2022-10-29T00:00:00.000Z',
    dateEnd: '2023-02-11T00:00:00.000Z',
    direction: {
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
