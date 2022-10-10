// src/mocks/browser.js
import { quizMockHandlers } from '@features/quiz';
import { setupWorker, rest } from 'msw';

// This configures a Service Worker with the given request handlers.
export const worker = setupWorker(
  ...quizMockHandlers,
  rest.get<null, { message: string }>('/ping', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        message: 'Hello world!',
      }),
    );
  }),
);
