import { faker } from '@faker-js/faker';
import { UserInfoFull } from '@features/users/users.entity';

export const fullUserFixture: UserInfoFull = {
  id: 1,
  surname: 'Семенов',
  name: 'Иван',
  patronymic: 'Иванович',
  roles: [
    {
      id: faker.datatype.uuid(),
      name: 'admin',
    },
  ],
  auth: {
    id: faker.datatype.uuid(),
    email: 'hello@mail.com',
  },
  isConfirmed: true,
  registeredAtDateMsk: '2020-01-01 00:00:00',
  profession: {
    id: 1,
    name: 'Developer',
  },
};
