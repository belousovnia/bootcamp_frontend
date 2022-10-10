export type QuizAnswerTag =
  | 'analytics'
  | 'design'
  | 'development'
  | 'testing'
  | 'administering';

type VariantQuestion = {
  text: string;
  variants: Array<{ text: string; tag: QuizAnswerTag }>;
};

export type QuizQuestion = VariantQuestion;

export type Quiz = {
  id: number;
  title: string;
  description: string;
  updatedAt: string;
  questions: QuizQuestion[];
};
