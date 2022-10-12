import { faker } from '@faker-js/faker';
import { rest } from 'msw';
import { CoursesListArgs, CoursesListResponse } from '../courses.service';
import { generateShortCourses, shortCourseFixtures } from './courses.fixtures';

const ITEMS_PER_PAGE = 12;

type FakeErrorJSON = {
  message: string;
};

const generated = generateShortCourses(200);

export const coursesMockHandlers = [
  // @NOTE: По какой-то причине MSW не принимает опциональные параметры.
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  rest.get<null, CoursesListArgs, CoursesListResponse | FakeErrorJSON>(
    `/api/courses`,
    (req, res, ctx) => {
      const searchParams = req.url.searchParams;
      const page = searchParams.get('page') || '1';
      const search = searchParams.get('search');
      const sortBy = searchParams.get('sortBy');

      let courses = shortCourseFixtures.slice();
      courses.push(...generated);

      if (search) {
        courses = courses.filter((course) => {
          return course.name.toLowerCase().includes(search.toLowerCase());
        });
      }

      if (sortBy) {
        courses = courses.sort((a, b) => {
          if (sortBy === 'date-start') {
            return new Date(a.dateStart).getTime() - new Date(b.dateStart).getTime();
          }
          if (sortBy === 'date-end') {
            return new Date(a.dateEnd).getTime() - new Date(b.dateEnd).getTime();
          }
          return 0;
        });
      }

      const TOTAL = courses.length;

      courses = courses.slice(
        (Number(page) - 1) * ITEMS_PER_PAGE,
        Number(page) * ITEMS_PER_PAGE,
      );

      console.log(page, search, sortBy, courses.length);
      console.log('mocked courses', courses);

      return res(
        ctx.delay(500),
        ctx.status(200),
        ctx.json({
          pagination: {
            page: 1,
            total: TOTAL,
          },
          courses,
        }),
      );
    },
  ),
];
