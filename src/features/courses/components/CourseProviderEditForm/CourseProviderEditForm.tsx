import { CourseProviderFull } from '@features/courses/cources.entity';
import { updateCourseProvider } from '@features/courses/courses.service';
import { useCourseProvider } from '@features/courses/hooks/useCourseProvider';
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
import { useMutation } from '@tanstack/react-query';
import { useCallback, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';

const LogoWrapper = styled('div')`
  max-width: 220px;
  height: 120px;
  border-radius: ${({ theme }) => theme.shape.borderRadius}px;
  overflow: hidden;
  position: relative;
`;

const Logo = styled('img')`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

export const CourseProviderEditForm = () => {
  const { id } = useParams<{ id: string }>();
  const { provider, isLoading } = useCourseProvider(id as string);
  const [snackbarVisible, setSnackbarVisible] = useState(false);

  const {
    mutate,
    isLoading: isMutationLoading,
    isSuccess: isMutationSuccess,
  } = useMutation((data: CourseProviderFull) => {
    return updateCourseProvider(data).then(() => {
      setSnackbarVisible(true);
    });
  });

  const { control, handleSubmit } = useForm<CourseProviderFull>();

  const onSubmit = useCallback(
    (data: CourseProviderFull) => {
      if (!isMutationLoading) {
        mutate(data);
      }
    },
    [isMutationLoading, mutate],
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <>
        {isLoading && <CircularProgress />}

        {provider && (
          <Card>
            <CardContent sx={{ p: { md: 5 } }}>
              <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                  <Controller
                    name="name"
                    control={control}
                    defaultValue={provider.name}
                    rules={{
                      required: {
                        value: true,
                        message: 'Поле обязательно для заполнения',
                      },
                    }}
                    render={({ field: { value, ...otherFields }, fieldState }) => (
                      <TextField
                        label="Название"
                        variant="outlined"
                        defaultValue={provider.name}
                        fullWidth
                        error={!!fieldState.error}
                        helperText={fieldState.error?.message}
                        {...otherFields}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Controller
                    name="url"
                    control={control}
                    defaultValue={provider.url}
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
                    render={({ field: { value, ...otherFields }, fieldState }) => (
                      <TextField
                        label="Ссылка на вебсайт"
                        variant="outlined"
                        fullWidth
                        defaultValue={provider.url}
                        error={!!fieldState.error}
                        helperText={fieldState.error?.message}
                        {...otherFields}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Controller
                    name="shortDescription"
                    defaultValue={provider.shortDescription}
                    control={control}
                    rules={{
                      required: {
                        value: true,
                        message: 'Поле обязательно для заполнения',
                      },
                    }}
                    render={({ field: { value, ...otherFields }, fieldState }) => (
                      <TextField
                        label="Краткое описание"
                        variant="outlined"
                        multiline
                        rows={4}
                        fullWidth
                        error={!!fieldState.error}
                        defaultValue={provider.shortDescription}
                        helperText={fieldState.error?.message}
                        {...otherFields}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Controller
                    name="description"
                    defaultValue={provider.description}
                    control={control}
                    rules={{
                      required: {
                        value: true,
                        message: 'Поле обязательно для заполнения',
                      },
                    }}
                    render={({ field: { value, ...otherFields }, fieldState }) => (
                      <TextField
                        label="Полное описание"
                        variant="outlined"
                        multiline
                        rows={4}
                        fullWidth
                        error={!!fieldState.error}
                        helperText={fieldState.error?.message}
                        defaultValue={provider.description}
                        {...otherFields}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Controller
                    name="coverUrl"
                    defaultValue={provider.coverUrl}
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
                    render={({ field: { value, ...otherFields }, fieldState }) => (
                      <TextField
                        label="Ссылка на обложку"
                        variant="outlined"
                        fullWidth
                        error={!!fieldState.error}
                        helperText={fieldState.error?.message}
                        defaultValue={provider.coverUrl}
                        {...otherFields}
                      />
                    )}
                  />
                </Grid>
              </Grid>
            </CardContent>
            <CardActions sx={{ p: { md: 5 }, pt: { md: 2 } }}>
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
                {isMutationLoading ? 'Сохранение...' : 'Сохранить'}
              </Button>
            </CardActions>
          </Card>
        )}
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
            Данные успешно сохранены
          </Alert>
        </Snackbar>
      </>
    </form>
  );
};
