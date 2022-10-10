export type QuizAnswerTag =
  | 'analytics'
  | 'design'
  | 'development'
  | 'testing'
  | 'administering';

type VariantQuestion = {
  question: string;
  variants: Array<{ text: string; tag: QuizAnswerTag }>;
};

type Question = VariantQuestion;

export type Quiz = {
  id: number;
  title: string;
  description: string;
  updatedAt: string;
  questions: Question[];
};
