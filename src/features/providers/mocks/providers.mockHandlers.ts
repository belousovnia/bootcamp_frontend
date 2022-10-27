import {
  generateProviders,
  ProviderCreateArgs,
  ProviderCreateResponse,
  providerFullFixture,
  ProviderResponse,
  ProvidersAllResponse,
  ProviderUpdateArgs,
} from '@features/providers';
import { rest } from 'msw';

const generatedProviders = generateProviders(100);

export const providersMockHandlers = [
  rest.get<null, any, ProvidersAllResponse>(
    `${import.meta.env.VITE_API_URL}/api/v1/providers/all`,
    (req, res, ctx) => {
      return res(ctx.delay(500), ctx.status(200), ctx.json(generatedProviders));
    },
  ),
  rest.get<null, any, ProviderResponse>(
    `${import.meta.env.VITE_API_URL}/api/v1/providers/:id`,
    (req, res, ctx) => {
      return res(ctx.delay(500), ctx.status(200), ctx.json(providerFullFixture));
    },
  ),
  rest.post<ProviderUpdateArgs, { id: string }, ProviderResponse>(
    `${import.meta.env.VITE_API_URL}/api/v1/providers/:id`,
    (req, res, ctx) => {
      return res(ctx.delay(500), ctx.status(200), ctx.json(providerFullFixture));
    },
  ),
  rest.post<ProviderCreateArgs, { id: string }, ProviderCreateResponse>(
    `${import.meta.env.VITE_API_URL}/api/v1/providers/new`,
    (req, res, ctx) => {
      return res(
        ctx.delay(500),
        ctx.status(200),
        ctx.json({
          type: 'success',
          message: 'Провайдер успешно создан',
        }),
      );
    },
  ),
];
