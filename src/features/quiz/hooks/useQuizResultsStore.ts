import create from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { QuizAnswerTag } from '../quiz.entity';

type Answer = {
  tag: QuizAnswerTag;
  index: number;
};

interface State {
  quizId: string | null;
  error: string | null;
  quizState: 'not-active' | 'in-progress' | 'completed';
  answers: {
    [key: number]: Answer;
  };

  currentStep: number; // Current question number
}

interface Actions {
  setQuizState: (quizState: State['quizState']) => void;
  setCurrentStep: (step: State['currentStep']) => void;
  setStepAnswer: (step: State['currentStep'], answer: Answer) => void;
}

export const useQuizResultsStore = create<State & Actions>()(
  devtools(
    persist(
      (set) => ({
        quizId: null,
        error: null,
        quizState: 'not-active',
        answers: [],
        currentStep: 0,
        setQuizState: (quizState) => set({ quizState }),
        setCurrentStep: (step) => set({ currentStep: step }),
        setStepAnswer: (step, answer) => {
          set((state) => ({
            answers: {
              ...state.answers,
              [step]: answer,
            },
          }));
        },
      }),
      {
        name: 'quiz-results-storage',
      },
    ),
  ),
);
