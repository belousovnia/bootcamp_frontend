import { rest } from 'msw';
import { Survey } from '../survey.entity';
import { surveyFixture } from '@features/survey';

type MockSurveyResponse = Survey;

export const surveyMockHandlers = [
  rest.get<null, never, MockSurveyResponse>(
    `${import.meta.env.VITE_API_URL}/api/v1/survey`,
    (req, res, ctx) => {
      return res(ctx.delay(2000), ctx.status(200), ctx.json(surveyFixture));
    },
  ),
  rest.post<null, never, MockSurveyResponse>(
    `${import.meta.env.VITE_API_URL}/api/v1/survey/result`,
    (req, res, ctx) => {
      return res(ctx.delay(1000), ctx.status(200));
    },
  ),
];
