// src/mocks/browser.js
import { coursesMockHandlers } from '@features/courses';
import { providersMockHandlers } from '@features/providers/mocks/providers.mockHandlers';
import { surveyMockHandlers } from '@features/survey';
import { usersMockHandlers } from '@features/users/mocks';
import { setupWorker } from 'msw';

// This configures a Service Worker with the given request handlers.
export const worker = setupWorker(
  ...usersMockHandlers,
  ...providersMockHandlers,
  ...coursesMockHandlers,
  ...surveyMockHandlers,
);
