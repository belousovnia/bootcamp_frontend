// src/mocks/browser.js
import { coursesMockHandlers } from '@features/courses';
import { surveyMockHandlers } from '@features/survey';
import { usersMockHandlers } from '@features/users/mocks';
import { setupWorker, rest } from 'msw';
import { providersMockHandlers } from '@features/providers/mocks/providers.mockHandlers';

// This configures a Service Worker with the given request handlers.
export const worker = setupWorker(
  ...usersMockHandlers,
  // ...providersMockHandlers,
  // ...coursesMockHandlers,
  ...surveyMockHandlers,
);
