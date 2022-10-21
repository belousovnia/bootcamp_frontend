import React, { useMemo, useState } from 'react';
import { registration } from '@features/auth/auth.service';
import { useAuthStore } from '@features/auth/auth.hooks';
import {
  Button,
  Container,
  FormHelperText,
  Input,
  InputLabel,
  Paper,
  Typography,
} from '@mui/material';
import { FieldValues, useForm } from 'react-hook-form';
import { StyledBox } from '@features/auth/components';
import { useLocation, useNavigate } from 'react-router-dom';

export const Registration = () => {
  const setAuth = useAuthStore((state) => state.setAuth);

  const navigate = useNavigate();
  const location = useLocation();

  const [warningMessage, setWarningMessage] = useState<string>('');

  const titleText = useMemo(() => {
    if (location.state?.from === '/survey') {
      return 'Для прохождения теста, пожалуйста, зарегистрируйтесь';
    }
    return 'Регистрация';
  }, [location.state]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: FieldValues) => {
    setWarningMessage('');
    commitRegistration(data);
  };

  const goToLogin = () => {
    navigate('/login', { state: { from: location.state?.from } });
  };

  const commitRegistration = async (user: FieldValues) => {
    try {
      await registration({
        email: user.email,
        password: user.password,
        name: user.name,
        surname: user.surname,
      })
        .then((response) => {
          localStorage.setItem('accessToken', response.data.accessToken);
          localStorage.setItem('refreshToken', response.data?.refreshToken);
          setWarningMessage('');
          setAuth(true);
          if (location.state?.from) navigate(location.state.from);
          else navigate('/');
        })
        .catch((error) => {
          if (error.response?.data.code === 'ITD_UEC_2')
            setWarningMessage('Пользователь с таким email уже существует!');
        });
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <Container
      maxWidth={'sm'}
      component={'form'}
      onSubmit={handleSubmit((data) => onSubmit(data))}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem',
        alignItems: 'center',
      }}
    >
      <Typography variant={'h4'} textAlign="center" maxWidth={570}>
        {titleText}
      </Typography>
      <Paper
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          alignItems: 'center',
          padding: '1.5rem',
          width: '100%',
        }}
        elevation={1}
      >
        <StyledBox>
          <InputLabel htmlFor={'email'}>Email</InputLabel>
          <Input
            {...register('email', {
              required: true,
              pattern: /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/,
            })}
            placeholder={'Ваша электронная почта'}
          />
          {errors.email && (
            <FormHelperText error sx={{ fontSize: '1rem' }}>
              Вы должны ввести свою почту
            </FormHelperText>
          )}
        </StyledBox>
        <StyledBox>
          <InputLabel htmlFor={'surname'}>Фамилия</InputLabel>
          <Input
            inputProps={{ number: 50 }}
            {...register('surname', {
              required: true,
              pattern: /^([А-Я][а-яё]{1,50}|[A-Z][a-z]{1,50})$/,
            })}
            placeholder={'Ваша фамилия'}
          />
          {errors.surname && (
            <FormHelperText error sx={{ fontSize: '1rem' }}>
              Вы должны ввести свою фамилию
            </FormHelperText>
          )}
        </StyledBox>
        <StyledBox>
          <InputLabel htmlFor={'name'}>Имя</InputLabel>
          <Input
            inputProps={{ number: 50 }}
            {...register('name', {
              required: true,
              pattern: /^([А-Я][а-яё]{1,50}|[A-Z][a-z]{1,50})$/,
            })}
            placeholder={'Ваше имя'}
          />
          {errors.name && (
            <FormHelperText error sx={{ fontSize: '1rem' }}>
              Вы должны ввести своё имя
            </FormHelperText>
          )}
        </StyledBox>
        <StyledBox>
          <InputLabel htmlFor={'password'}>Пароль</InputLabel>
          <Input
            type={'password'}
            {...register('password', {
              required: true,
              pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,20}$/,
            })}
            placeholder={'Ваш пароль'}
            title={
              'Пароль должен содержать от 8 до 20 символов, состоять из латинских букв, содержать как минимум 1 прописную и 1 заглавную буквы, 1 цифру.'
            }
          />
          {errors.password && (
            <FormHelperText error sx={{ fontSize: '1rem' }}>
              Пароль должен содержать от 8 до 20 символов, состоять из латинских букв и
              содержать как минимум 1 прописную и 1 заглавную буквы и 1 цифру.
            </FormHelperText>
          )}
        </StyledBox>
        {warningMessage && (
          <FormHelperText error sx={{ fontSize: '1rem' }}>
            {warningMessage}
          </FormHelperText>
        )}
        <Button variant={'contained'} size={'large'} type={'submit'}>
          Зарегистрироваться
        </Button>
        <Button size={'small'} onClick={() => goToLogin()}>
          {'Уже зарегистрированы?'}
        </Button>
      </Paper>
    </Container>
  );
};
