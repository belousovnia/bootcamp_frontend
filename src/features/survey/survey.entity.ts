export type SurveyAnswerTag =
  | 'analytics'
  | 'design'
  | 'development'
  | 'testing'
  | 'administering';

type SurveyQuestionAnswer = {
  answerId: number;
  text: string;
};

type VariantQuestion = {
  questionId: number;
  question: string;
  answers: SurveyQuestionAnswer[];
};

export type SurveyQuestion = VariantQuestion;

export type Survey = {
  surveyId: number;
  title: string;
  description: string;
  survey: SurveyQuestion[];
};
