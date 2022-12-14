import { useProvider } from '@features/providers/hooks/useProvider';
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
import { useParams } from 'react-router-dom';
import { updateProvider } from '@features/providers/providers.service';
import { ProviderFull } from '@features/providers';
import { REQUIRED_DEFAULT_RULE, URL_PATTERN_RULE } from '@utils/formValidationUtils';

export const ProviderEditForm = () => {
  const { id } = useParams<{ id: string }>();
  const queryClient = useQueryClient();
  const { provider, isLoading, error } = useProvider(id as string);
  const [snackbarVisible, setSnackbarVisible] = useState(false);

  const {
    mutate,
    isLoading: isMutationLoading,
    isSuccess: isMutationSuccess,
    isError: isMutationError,
    error: mutationError,
  } = useMutation<void, Error, ProviderFull>((data: ProviderFull) => {
    return updateProvider({ ...data, id: provider?.id as number })
      .then(() => {
        setSnackbarVisible(true);
        queryClient.invalidateQueries(['providers']);
        queryClient.refetchQueries(['provider', id]);
      })
      .catch((e) => {
        console.log(e);
      });
  });

  const { control, handleSubmit } = useForm<ProviderFull>();

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
        {isLoading && <CircularProgress />}
        {error && (
          <Alert color="error">
            <AlertTitle>Ой! Кажется произошла ошибка</AlertTitle>
            {error.message}
          </Alert>
        )}
        {provider && (
          <Card>
            <CardContent sx={{ p: { xs: 3, md: 5 } }}>
              {isMutationError && (
                <Alert color="error">
                  <AlertTitle>Ой! Кажется произошла ошибка</AlertTitle>
                  {mutationError.message}
                </Alert>
              )}
              <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                  <Controller
                    name="name"
                    control={control}
                    defaultValue={provider.name}
                    rules={{
                      required: REQUIRED_DEFAULT_RULE,
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
                      required: REQUIRED_DEFAULT_RULE,
                      pattern: URL_PATTERN_RULE,
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
                <Grid item xs={12} md={12}>
                  <Controller
                    name="description"
                    defaultValue={provider.description}
                    control={control}
                    rules={{
                      required: REQUIRED_DEFAULT_RULE,
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
                      required: REQUIRED_DEFAULT_RULE,
                      pattern: URL_PATTERN_RULE,
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
