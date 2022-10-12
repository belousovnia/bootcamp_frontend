import create from 'zustand';
import { devtools, persist } from 'zustand/middleware';

type Answer = {
  number: number;
};

interface State {
  surveyId: string | null;
  error: string | null;
  surveyState: 'not-active' | 'in-progress' | 'completed';
  answers: {
    [key: number]: Answer;
  };

  currentStep: number; // Current question number
}

interface Actions {
  setSurveyState: (surveyState: State['surveyState']) => void;
  setCurrentStep: (step: State['currentStep']) => void;
  setStepAnswer: (step: State['currentStep'], answer: Answer) => void;
}

export const useSurveyResultsStore = create<State & Actions>()(
  devtools(
    persist(
      (set) => ({
        surveyId: null,
        error: null,
        surveyState: 'not-active',
        answers: [],
        currentStep: 1,
        setSurveyState: (surveyState) => set({ surveyState }),
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
        name: 'survey-results-storage',
      },
    ),
  ),
);
