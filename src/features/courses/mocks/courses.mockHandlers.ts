import { rest } from 'msw';
import { CoursesListArgs, CoursesListResponse } from '../courses.service';
import { courseFixtures } from './courses.fixtures';

export const coursesMockHandlers = [
  // @NOTE: По какой-то причине MSW не принимает опциональные параметры.
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  rest.get<null, CoursesListArgs, CoursesListResponse>(
    `/api/courses`,
    (req, res, ctx) => {
      const { page, search, sortBy, directionId } = req.params;
      return res(
        ctx.delay(500),
        ctx.status(200),
        ctx.json({
          pagination: {
            page: 1,
            total: 1000,
          },
          courses: courseFixtures,
        }),
      );
    },
  ),
];
