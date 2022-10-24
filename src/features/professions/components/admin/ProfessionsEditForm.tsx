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
import { useProfession } from '@features/professions/professions.hooks';
import { ProfessionEntity } from '@features/professions/professions.entity';
import { updateProfession } from '@features/professions/professions.service';
import { REQUIRED_DEFAULT_RULE, URL_PATTERN_RULE } from '@utils/formValidationUtils';

export const ProfessionsEditForm = () => {
  const { id } = useParams<{ id: string }>();
  const queryClient = useQueryClient();
  const profession = useProfession(id as string);
  const [snackbarVisible, setSnackbarVisible] = useState(false);

  const {
    mutate,
    isLoading: isMutationLoading,
    isSuccess: isMutationSuccess,
    isError: isMutationError,
    error: mutationError,
  } = useMutation<void, Error, ProfessionEntity>((data: ProfessionEntity) => {
    return updateProfession({ ...data, id: profession.data?.id as number })
      .then(() => {
        setSnackbarVisible(true);
        queryClient.invalidateQueries(['professions']);
        queryClient.refetchQueries(['profession', id]);
      })
      .catch((e) => {
        console.log(e);
      });
  });

  const { control, handleSubmit } = useForm<ProfessionEntity>();

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
        {profession.isLoading && <CircularProgress />}
        {profession.error && (
          <Alert color="error">
            <AlertTitle>Ой! Кажется произошла ошибка</AlertTitle>
            {profession.error.message}
          </Alert>
        )}
        {profession.data && (
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
                    defaultValue={profession.data.name}
                    rules={{
                      required: REQUIRED_DEFAULT_RULE,
                    }}
                    render={({ field: { value, ...otherFields }, fieldState }) => (
                      <TextField
                        label="Название"
                        variant="outlined"
                        defaultValue={profession.data.name}
                        fullWidth
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
                    defaultValue={profession.data.description}
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
                        defaultValue={profession.data.description}
                        {...otherFields}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Controller
                    name="coverUrl"
                    defaultValue={profession.data.coverUrl}
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
                        defaultValue={profession.data.coverUrl}
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
