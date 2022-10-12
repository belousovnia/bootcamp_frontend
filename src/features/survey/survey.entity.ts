export type SurveyAnswerTag =
  | 'analytics'
  | 'design'
  | 'development'
  | 'testing'
  | 'administering';

type VariantQuestion = {
  text: string;
  variants: Array<{ text: string; tag: SurveyAnswerTag }>;
};

export type SurveyQuestion = VariantQuestion;

export type Survey = {
  id: number;
  title: string;
  description: string;
  updatedAt: string;
  questions: SurveyQuestion[];
};
