import { rest } from 'msw';
import {
  CourseCreateArgs,
  CourseCreateResponse,
  CourseDetailsResponse,
  CoursesAllResponse,
  CoursesListArgs,
  CoursesListResponse,
  CourseUpdateArgs,
  CourseUpdateResponse,
} from '../courses.service';
import { generateCourses, coursesFixtures, fullCourseFixture } from './courses.fixtures';

const ITEMS_PER_PAGE = 9;

const generated = generateCourses(200);

export const coursesMockHandlers = [
  // @NOTE: По какой-то причине MSW не принимает опциональные параметры.
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  rest.get<null, CoursesListArgs, CoursesListResponse>(
    `${import.meta.env.VITE_API_URL}/api/v1/courses`,
    (req, res, ctx) => {
      const searchParams = req.url.searchParams;
      const page = searchParams.get('page') || '1';
      const search = searchParams.get('search');
      const sortBy = searchParams.get('sortBy');
      let courses = coursesFixtures.slice();
      courses.push(...generated);
      if (search) {
        courses = courses.filter((course) => {
          return course.title.toLowerCase().includes(search.toLowerCase());
        });
      }
      if (sortBy) {
        courses = courses.sort((a, b) => {
          if (sortBy === 'date-start') {
            return new Date(a.startsAt).getTime() - new Date(b.startsAt).getTime();
          }
          if (sortBy === 'date-end') {
            return new Date(a.endsAt).getTime() - new Date(b.endsAt).getTime();
          }
          return 0;
        });
      }
      const TOTAL_PAGES = Math.floor(courses.length / ITEMS_PER_PAGE);
      courses = courses.slice(
        (Number(page) - 1) * ITEMS_PER_PAGE,
        Number(page) * ITEMS_PER_PAGE,
      );
      return res(
        ctx.delay(500),
        ctx.status(200),
        ctx.json({
          totalElements: courses.length,
          totalPages: TOTAL_PAGES,
          pageNumber: parseInt(page),
          pageSize: ITEMS_PER_PAGE,
          content: courses,
        }),
      );
    },
  ),
  rest.get<null, any, CoursesAllResponse>(
    `${import.meta.env.VITE_API_URL}/api/v1/courses/all`,
    (req, res, ctx) => {
      return res(ctx.delay(500), ctx.status(200), ctx.json(generated));
    },
  ),
  rest.get<null, any, CourseDetailsResponse>(
    `${import.meta.env.VITE_API_URL}/api/v1/courses/:id`,
    (req, res, ctx) => {
      return res(ctx.delay(500), ctx.status(200), ctx.json(fullCourseFixture));
    },
  ),
  rest.post<CourseUpdateArgs, { id: string }, CourseUpdateResponse>(
    `${import.meta.env.VITE_API_URL}/api/v1/courses/:id`,
    async (req, res, ctx) => {
      return res(
        ctx.delay(500),
        ctx.status(200),
        ctx.json({
          type: 'success',
          message: 'Курс успешно обновлен',
        }),
      );
    },
  ),
  rest.post<CourseCreateArgs, CourseCreateResponse>(
    `${import.meta.env.VITE_API_URL}/api/v1/courses/new`,
    (req, res, ctx) => {
      return res(
        ctx.delay(500),
        ctx.status(200),
        ctx.json({
          type: 'success',
          message: 'Курс успешно cоздан',
        }),
      );
    },
  ),
];
