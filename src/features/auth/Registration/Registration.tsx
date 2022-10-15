import React, { useState } from 'react';
import { registration } from '@features/auth/auth.service';
import axios from 'axios';
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

interface RegistrationProps {
  title?: string;
}

export const Registration = ({ title }: RegistrationProps) => {
  const setAuth = useAuthStore((state) => state.setAuth);
  const [warningMessage, setWarningMessage] = useState<string>('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: FieldValues) => {
    setWarningMessage('');
    commitRegistration(data);
  };

  const commitRegistration = async (user: FieldValues) => {
    try {
      await registration({
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        middleName: user.middleName,
        password: user.password,
      })
        .then((response) => {
          localStorage.setItem('accessToken', response.data.accessToken);
          localStorage.setItem('refreshToken', response.data.refreshToken);
          setWarningMessage('');
          setAuth(true);
        })
        .catch(() => {
          setWarningMessage('Пользователь с таким email уже существует!');
        });
    } catch (e) {
      if (axios.isAxiosError(e)) console.log(e.response?.data?.message);
      else console.log(e);
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
      <Typography variant={'h4'} textAlign="center" maxWidth={470}>
        {title ?? 'Регистрация'}
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
            type={'email'}
            {...register('email', { required: true })}
            placeholder={'Ваша электронная почта'}
          />
          {errors.email && (
            <FormHelperText error sx={{ fontSize: '1rem' }}>
              Вы должны ввести свою почту
            </FormHelperText>
          )}
        </StyledBox>
        <StyledBox>
          <InputLabel htmlFor={'lastName'}>Фамилия</InputLabel>
          <Input
            inputProps={{ number: 50 }}
            {...register('lastName', { required: true })}
            placeholder={'Ваша фамилия'}
          />
          {errors.lastName && (
            <FormHelperText error sx={{ fontSize: '1rem' }}>
              Вы должны ввести свою фамилию
            </FormHelperText>
          )}
        </StyledBox>
        <StyledBox>
          <InputLabel htmlFor={'firstName'}>Имя</InputLabel>
          <Input
            inputProps={{ number: 50 }}
            {...register('firstName', { required: true })}
            placeholder={'Ваше имя'}
          />
          {errors.firstName && (
            <FormHelperText error sx={{ fontSize: '1rem' }}>
              Вы должны ввести своё имя
            </FormHelperText>
          )}
        </StyledBox>
        <StyledBox>
          <InputLabel htmlFor={'middleName'}>Отчество</InputLabel>
          <Input
            inputProps={{ number: 50 }}
            {...register('middleName', { required: true })}
            placeholder={'Ваше отчество'}
          />
          {errors.middleName && (
            <FormHelperText error sx={{ fontSize: '1rem' }}>
              Вы должны ввести своё отчество
            </FormHelperText>
          )}
        </StyledBox>
        <StyledBox>
          <InputLabel htmlFor={'password'}>Пароль</InputLabel>
          <Input
            type={'password'}
            {...register('password', {
              required: true,
              pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
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
      </Paper>
    </Container>
  );
};
