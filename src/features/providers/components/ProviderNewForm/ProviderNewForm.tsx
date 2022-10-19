import {
  Alert,
  Button,
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  Grid,
  Snackbar,
  styled,
  TextField,
} from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useCallback, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { createProvider } from '@features/providers/providers.service';
import { ProviderFull } from '@features/providers';

export const ProviderNewForm = () => {
  const { id } = useParams<{ id: string }>();
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const { control, handleSubmit, reset } = useForm<ProviderFull>();
  const queryClient = useQueryClient();

  const {
    mutate,
    isLoading: isMutationLoading,
    isSuccess: isMutationSuccess,
  } = useMutation((data: ProviderFull) => {
    return createProvider(data).then(() => {
      setSnackbarVisible(true);
      reset({ name: '', description: '', coverUrl: '', url: '' });
      queryClient.invalidateQueries(['providers']);
    });
  });

  const onSubmit = useCallback(
    (data: ProviderFull) => {
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
            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
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
              <Grid item xs={12} md={6}>
                <Controller
                  name="url"
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
                      label="Ссылка на вебсайт"
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
            Создатель курсов успешно добавлен
          </Alert>
        </Snackbar>
      </>
    </form>
  );
};
