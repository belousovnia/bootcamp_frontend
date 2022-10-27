import { rest } from 'msw';
import { GetUserInfoResponse } from '@features/users/users.service';
import { fullUserFixture } from './users.fixtures';

export const usersMockHandlers = [
  rest.get<null, never, GetUserInfoResponse>(
    `${import.meta.env.VITE_API_URL}/api/v1/user/me`,
    (req, res, ctx) => {
      return res(ctx.delay(500), ctx.status(200), ctx.json(fullUserFixture));
    },
  ),
];
