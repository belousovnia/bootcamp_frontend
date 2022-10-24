// src/mocks/browser.js
import { surveyMockHandlers } from '@features/survey';
import { usersMockHandlers } from '@features/users/mocks';
import { setupWorker } from 'msw';

// This configures a Service Worker with the given request handlers.
export const worker = setupWorker(
  ...usersMockHandlers,
  // ...providersMockHandlers,
  // ...coursesMockHandlers,
  ...surveyMockHandlers,
);
