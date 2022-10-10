import { rest } from 'msw';
import { Quiz } from '../quiz.entity';
import { quizFixture } from './quiz.fixtures';

type MockQuizResponse = Quiz;

export const quizMockHandlers = [
  rest.get<null, never, MockQuizResponse>(`/api/quiz`, (req, res, ctx) => {
    return res(ctx.delay(2000), ctx.status(200), ctx.json(quizFixture));
  }),
];
