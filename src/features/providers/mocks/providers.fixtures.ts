import { ProviderFull, ProviderShort } from '@features/providers';
import { faker } from '@faker-js/faker';

export const providerFullFixture: ProviderFull = {
  id: faker.datatype.number(),
  name: 'Мобильное электронное образование',
  url: 'http://habr.ru',
  coverUrl:
    'https://www.silvermedia.ru/upload/resize_cache/iblock/196/75_75_1/2800374.jpg',
  description: 'Описание',
};

export const generateProviders = (count: number): ProviderFull[] => {
  return Array.from({ length: count }, () => {
    return {
      id: faker.datatype.number(),
      name: faker.lorem.words(2),
      url: faker.internet.url(),
      coverUrl:
        'https://www.silvermedia.ru/upload/resize_cache/iblock/196/75_75_1/2800374.jpg',
      description: faker.lorem.words(10),
    };
  });
};
