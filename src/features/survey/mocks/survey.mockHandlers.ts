import { rest } from 'msw';
import { Survey } from '../survey.entity';
import { surveyFixture } from '@features/survey';

type MockSurveyResponse = Survey;

export const surveyMockHandlers = [
  rest.get<null, never, MockSurveyResponse>(`/api/survey`, (req, res, ctx) => {
    return res(ctx.delay(2000), ctx.status(200), ctx.json(surveyFixture));
  }),
  rest.post<null, never, MockSurveyResponse>(`/api/survey/result`, (req, res, ctx) => {
    console.log('received survey result', req.body);

    return res(ctx.delay(1000), ctx.status(200));
  }),
];
