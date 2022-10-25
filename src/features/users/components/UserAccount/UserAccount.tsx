import { useCurrentUserProfile } from '@features/users/hooks';
import {
  Alert,
  Box,
  Button,
  Card,
  CircularProgress,
  FormGroup,
  FormHelperText,
  List,
  ListItem,
  styled,
  TextField,
  Typography,
} from '@mui/material';
import dayjs from 'dayjs';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { changeCurrentUserProfile } from '@features/users/users.service';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useQueryClient } from '@tanstack/react-query';

const StyledListItemTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  fontSize: '1.2rem',
  color: theme.palette.text.primary,
}));

export const UserAccount = () => {
  const redactUserSchema = yup.object().shape({
    email: yup
      .string()
      .email('Вы не ввели почту!')
      .max(100, 'Слишком много символов.')
      .required('Вы должны ввести действительную почту.'),
    surname: yup
      .string()
      .required('Вы не ввели фамилию!')
      .matches(
        /^([А-Я][а-яё]{0,50}|[A-Z][a-z]{0,50})$/,
        'Фамилия должна начинаться с большой буквы.',
      ),
    name: yup
      .string()
      .required('Вы не ввели имя!')
      .matches(
        /^([А-Я][а-яё]{0,50}|[A-Z][a-z]{0,50})$/,
        'Имя должно начинаться с большой буквы.',
      ),
  });

  const { profile, isLoading, error } = useCurrentUserProfile();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RedactUser>({
    resolver: yupResolver(redactUserSchema),
  });
  const [redactMode, setRedactMode] = useState<boolean>(false);
  const queryClient = useQueryClient();

  interface RedactUser {
    email: string;
    name: string;
    surname: string;
  }

  const onSubmit = async (user: RedactUser) => {
    if (
      user.name !== profile?.name ||
      user.surname !== profile?.surname ||
      user.email !== profile?.email
    ) {
      profile && (await changeCurrentUserProfile({ ...profile, ...user }));
      await queryClient.invalidateQueries(['currentUserProfile']);
    }
    setRedactMode(!redactMode);
  };

  return (
    <>
      <Typography variant="h3" component={'h1'} marginBottom={3}>
        Мой аккаунт
      </Typography>
      {isLoading && <CircularProgress />}
      {error && (
        <Box sx={{ mt: 3 }}>
          <Alert severity="error">
            Ой! Кажется произошла ошибка. Попробуйте перезагрузить страницу.
          </Alert>
        </Box>
      )}
      {profile &&
        (!redactMode ? (
          <Card sx={{ p: { xs: 3 } }}>
            <List>
              <ListItem>
                <FormGroup>
                  <StyledListItemTitle>Email:</StyledListItemTitle>
                  <Typography>{profile.email}</Typography>
                </FormGroup>
              </ListItem>
              <ListItem>
                <FormGroup>
                  <StyledListItemTitle>Имя:</StyledListItemTitle>
                  <Typography>{profile.name ?? 'Не указано'}</Typography>
                </FormGroup>
              </ListItem>
              <ListItem>
                <FormGroup>
                  <StyledListItemTitle>Фамилия:</StyledListItemTitle>
                  <Typography>{profile.surname ?? 'Не указана'}</Typography>
                </FormGroup>
              </ListItem>
              <ListItem>
                <FormGroup>
                  <StyledListItemTitle>Дата регистрации:</StyledListItemTitle>
                  <Typography>
                    {dayjs(profile.registeredAt).format('DD.MM.YYYY').toString()}
                  </Typography>
                </FormGroup>
              </ListItem>
              <ListItem>
                <Button
                  variant={'contained'}
                  size={'large'}
                  onClick={() => setRedactMode(!redactMode)}
                >
                  Редактировать профиль
                </Button>
              </ListItem>
            </List>
          </Card>
        ) : (
          <Card sx={{ p: { xs: 3 } }}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <List>
                <ListItem>
                  <FormGroup>
                    <StyledListItemTitle>Email:</StyledListItemTitle>
                    <TextField
                      size={'small'}
                      defaultValue={profile.email}
                      {...register('email')}
                    />
                    {errors.email && (
                      <FormHelperText error sx={{ fontSize: '1rem' }}>
                        {errors.email.message?.toString()}
                      </FormHelperText>
                    )}
                  </FormGroup>
                </ListItem>
                <ListItem>
                  <FormGroup>
                    <StyledListItemTitle>Имя:</StyledListItemTitle>
                    <TextField
                      size={'small'}
                      defaultValue={profile.name}
                      {...register('name')}
                    />
                    {errors.name && (
                      <FormHelperText error sx={{ fontSize: '1rem' }}>
                        {errors.name.message?.toString()}
                      </FormHelperText>
                    )}
                  </FormGroup>
                </ListItem>
                <ListItem>
                  <FormGroup>
                    <StyledListItemTitle>Фамилия:</StyledListItemTitle>
                    <TextField
                      size={'small'}
                      defaultValue={profile.surname}
                      {...register('surname')}
                    />
                    {errors.surname && (
                      <FormHelperText error sx={{ fontSize: '1rem' }}>
                        {errors.surname.message?.toString()}
                      </FormHelperText>
                    )}
                  </FormGroup>
                </ListItem>
                <ListItem>
                  <Button variant={'contained'} size={'large'} type={'submit'}>
                    Сохранить
                  </Button>
                </ListItem>
              </List>
            </form>
          </Card>
        ))}
    </>
  );
};
