import create from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { Survey } from '../survey.entity';

export interface SurveyResultsState {
  surveyId: Survey['surveyId'] | null;
  error: string | null;
  surveyState: 'not-active' | 'in-progress' | 'completed';
  answers: {
    // Ключи - это questionId, а значения answerId
    [key: number]: number;
  };

  currentStep: number; // Current question number
}

interface Actions {
  setSurveyState: (surveyState: SurveyResultsState['surveyState']) => void;
  setCurrentStep: (step: SurveyResultsState['currentStep']) => void;
  setStepAnswer: (questionId: number, answerId: number) => void;
}

export const useSurveyResultsStore = create<SurveyResultsState & Actions>()(
  devtools(
    persist(
      (set) => ({
        surveyId: null,
        error: null,
        surveyState: 'not-active',
        answers: [],
        currentStep: 0,
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
