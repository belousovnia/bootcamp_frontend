import { faker } from '@faker-js/faker';
import { CurrentUserRoles } from '@features/auth';
import { UserInfoFull } from '@features/users/users.entity';

export const fullUserFixture: UserInfoFull = {
  id: 1,
  role: CurrentUserRoles.ROLE_REGULAR,
  email: faker.internet.email(),
};
