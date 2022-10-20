import {
  Alert,
  AlertTitle,
  Button,
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  Grid,
  Snackbar,
  TextField,
} from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useCallback, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { createProfession } from '@features/professions/professions.service';
import { ProfessionEntity } from '@features/professions/professions.entity';

export const ProfessionsNewForm = () => {
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const { control, handleSubmit, reset } = useForm<ProfessionEntity>();
  const queryClient = useQueryClient();

  const {
    mutate,
    isLoading: isMutationLoading,
    isSuccess: isMutationSuccess,
    isError: isMutationError,
    error: mutationError,
  } = useMutation<void, Error, ProfessionEntity>((data: ProfessionEntity) => {
    return createProfession(data).then(() => {
      setSnackbarVisible(true);
      reset({ name: '', description: '', coverUrl: '' });
      queryClient.invalidateQueries(['professions']);
    });
  });

  const onSubmit = useCallback(
    (data: ProfessionEntity) => {
      if (!isMutationLoading) {
        mutate(data);
      }
    },
    [isMutationLoading, mutate],
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <>
        <Card>
          <CardContent sx={{ p: { xs: 3, md: 5 } }}>
            {isMutationError && (
              <Alert color="error">
                <AlertTitle>Ой! Кажется произошла ошибка</AlertTitle>
                {mutationError.message}
              </Alert>
            )}
            <Grid container spacing={4}>
              <Grid item xs={12}>
                <Controller
                  name="name"
                  control={control}
                  rules={{
                    required: {
                      value: true,
                      message: 'Поле обязательно для заполнения',
                    },
                  }}
                  render={({ field, fieldState }) => (
                    <TextField
                      label="Название"
                      variant="outlined"
                      fullWidth
                      error={!!fieldState.error}
                      helperText={fieldState.error?.message}
                      {...field}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="description"
                  control={control}
                  rules={{
                    required: {
                      value: true,
                      message: 'Поле обязательно для заполнения',
                    },
                  }}
                  render={({ field, fieldState }) => (
                    <TextField
                      label="Полное описание"
                      variant="outlined"
                      multiline
                      rows={4}
                      fullWidth
                      error={!!fieldState.error}
                      helperText={fieldState.error?.message}
                      {...field}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="coverUrl"
                  control={control}
                  rules={{
                    required: {
                      value: true,
                      message: 'Поле обязательно для заполнения',
                    },
                    pattern: {
                      message: 'Неверный формат ссылки',
                      value:
                        /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)$/,
                    },
                  }}
                  render={({ field, fieldState }) => (
                    <TextField
                      label="Ссылка на обложку"
                      variant="outlined"
                      fullWidth
                      error={!!fieldState.error}
                      helperText={fieldState.error?.message}
                      {...field}
                    />
                  )}
                />
              </Grid>
            </Grid>
          </CardContent>
          <CardActions sx={{ p: { xs: 3, md: 5 }, pt: { md: 2 } }}>
            <Button
              type="submit"
              size="large"
              variant="contained"
              sx={{ minHeight: '56px', width: '240px' }}
              startIcon={
                isMutationLoading ? (
                  <CircularProgress color="inherit" sx={{ mr: 1 }} />
                ) : undefined
              }
            >
              {isMutationLoading ? 'Добавление...' : 'Добавить'}
            </Button>
          </CardActions>
        </Card>

        <Snackbar
          open={isMutationSuccess && snackbarVisible}
          autoHideDuration={6000}
          onClick={() => setSnackbarVisible(false)}
          onClose={() => setSnackbarVisible(false)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
          <Alert
            severity="success"
            sx={{ width: '100%', border: 1, borderColor: 'primary.main' }}
          >
            Профессия успешно добавлена
          </Alert>
        </Snackbar>
      </>
    </form>
  );
};
