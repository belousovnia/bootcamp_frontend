import { rest } from 'msw';
import {
  ProviderCreateArgs,
  ProviderCreateResponse,
  ProviderResponse,
  ProvidersListResponse,
  ProviderUpdateArgs,
} from '@features/providers/providers.service';
import {
  generateShortProviders,
  providerFullFixture as fullCourseProviderFixture,
} from '@features/providers';

const ITEMS_PER_PAGE = 12;

type FakeErrorJSON = {
  message: string;
};

const generatedShortProviders = generateShortProviders(100);

export const providersMockHandlers = [
  // rest.get<null, any, ProvidersListResponse | FakeErrorJSON>(
  //   `/api/providers`,
  //   (req, res, ctx) => {
  //     const page = req.url.searchParams.get('page') || '1';
  //     const sliced = generatedShortProviders.slice(
  //       (Number(page) - 1) * ITEMS_PER_PAGE,
  //       Number(page) * ITEMS_PER_PAGE,
  //     );
  //     return res(
  //       ctx.delay(500),
  //       ctx.status(200),
  //       ctx.json(sliced as ProvidersListResponse),
  //     );
  //   },
  // ),
  // rest.get<null, any, ProviderResponse | FakeErrorJSON>(
  //   `/api/providers/:id`,
  //   (req, res, ctx) => {
  //     return res(ctx.delay(500), ctx.status(200), ctx.json(fullCourseProviderFixture));
  //   },
  // ),
  // rest.post<ProviderUpdateArgs, { id: string }, ProviderResponse | FakeErrorJSON>(
  //   `/api/providers/:id`,
  //   (req, res, ctx) => {
  //     const { id } = req.params;
  //     const { name, description } = req.body;
  //     return res(
  //       ctx.delay(500),
  //       ctx.status(200),
  //       ctx.json({
  //         success: true,
  //         message: 'Курс успешно обновлен',
  //       }),
  //     );
  //   },
  // ),
  // rest.post<ProviderCreateArgs, { id: string }, ProviderCreateResponse | FakeErrorJSON>(
  //   `/api/providers/new`,
  //   (req, res, ctx) => {
  //     const { id } = req.params;
  //     const { name, description } = req.body;
  //     return res(
  //       ctx.delay(500),
  //       ctx.status(200),
  //       ctx.json({
  //         success: true,
  //         message: 'Курс успешно обновлен',
  //       }),
  //     );
  //   },
  // ),
  // rest.delete<ProviderUpdateArgs, { id: string }, ProviderResponse | FakeErrorJSON>(
  //   `/api/providers/:id`,
  //   (req, res, ctx) => {
  //     const { id } = req.params;
  //     const { name, description } = req.body;
  //     return res(
  //       ctx.delay(500),
  //       ctx.status(200),
  //       ctx.json({
  //         success: true,
  //         message: 'Курс успешно удален',
  //       }),
  //     );
  //   },
  // ),
];
