import { Registration, useAuthStore } from '@features/auth';
import { SurveyStartCard } from '@features/survey/components/SurveyStartCard/SurveyStartCard';
import { Container } from '@mui/material';
import { useNavigation } from 'react-router-dom';

export const SurveyScreen = () => {
  const isAuth = useAuthStore((state) => state.isAuth);

  return isAuth ? (
    <SurveyStartCard />
  ) : (
    <Registration title="Для прохождения теста нужно зарегистрироваться" />
  );
};
