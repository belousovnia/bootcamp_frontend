import { rest } from 'msw';
import { Survey } from '../survey.entity';
import { surveyFixture } from './survey.fixtures';

type MockSurveyResponse = Survey;

export const surveyMockHandlers = [
  rest.get<null, never, MockSurveyResponse>(`/api/survey`, (req, res, ctx) => {
    return res(ctx.delay(2000), ctx.status(200), ctx.json(surveyFixture));
  }),
];
