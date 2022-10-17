import React, { useState } from 'react';
import { login } from '@features/auth/auth.service';
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
import { Link } from 'react-router-dom';
import { StyledBox } from '../components';

export const Login = () => {
  const setAuth = useAuthStore((state) => state.setAuth);
  const [warningMessage, setWarningMessage] = useState<string>('');

  const { register, handleSubmit } = useForm();

  const onSubmit = (data: FieldValues) => {
    auth(data.email, data.password);
  };

  const auth = async (email: string, password: string) => {
    try {
      await login(email, password)
        .then((response) => {
          localStorage.setItem('accessToken', response.data.accessToken);
          if (response.data.refreshToken)
            localStorage.setItem('refreshToken', response.data.refreshToken);
          setWarningMessage('');
          setAuth(true);
        })
        .catch(() => {
          setWarningMessage('Логин и пароль не совпадают!');
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
      <Typography variant={'h4'}>Войти в систему</Typography>
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
        </StyledBox>
        <StyledBox>
          <InputLabel
            sx={{ display: 'flex', justifyContent: 'space-between' }}
            htmlFor={'password'}
          >
            Пароль
            {/*TODO: Добавить смену пароля*/}
            {/*<Link component={'button'}>{'Забыли пароль?'}</Link>{' '}*/}
          </InputLabel>
          <Input
            type={'password'}
            {...register('password', { required: true })}
            placeholder={'Ваш пароль'}
          />
        </StyledBox>
        {warningMessage && (
          <FormHelperText error sx={{ fontSize: '1rem' }}>
            {warningMessage}
          </FormHelperText>
        )}
        <Button
          variant={'contained'}
          size={'large'}
          sx={{ width: '20%' }}
          type={'submit'}
        >
          Войти
        </Button>
        <Button to={'/registration'} component={Link}>
          {'Зарегистрироваться'}
        </Button>
      </Paper>
    </Container>
  );
};
