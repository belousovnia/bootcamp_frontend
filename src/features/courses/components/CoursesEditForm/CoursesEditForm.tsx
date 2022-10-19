import { CourseFull } from '@features/courses/cources.entity';
import { CourseCreateArgs, updateCourse } from '@features/courses/courses.service';
import { useCourse } from '@features/courses/hooks/useCourse';
import { useAllProviders } from '@features/providers/hooks/useAllProviders';
import {
  Alert,
  AlertTitle,
  Autocomplete,
  Button,
  Card,
  CardActions,
  CardContent,
  Checkbox,
  Chip,
  CircularProgress,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
  styled,
  TextField,
} from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useCallback, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { updateProvider } from '@features/providers/providers.service';
import { ProviderFull } from '@features/providers';
import {
  useAllProfessions,
  useProfessions,
} from '@features/professions/professions.hooks';

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

export const CoursesEditForm = () => {
  const { id } = useParams<{ id: string }>();
  const { course, isLoading, error } = useCourse(id || '');
  const { courseProviders } = useAllProviders();
  const [snackbarVisible, setSnackbarVisible] = useState(false);

  const queryClient = useQueryClient();

  const {
    data: professions,
    isLoading: isLoadingProfessions,
    error: professionsError,
  } = useAllProfessions();

  const {
    mutate,
    isLoading: isMutationLoading,
    isSuccess: isMutationSuccess,
    isError: isMutationError,
    error: mutationError,
  } = useMutation<void, Error, CourseCreateArgs>((data: CourseCreateArgs) => {
    return updateCourse({ ...data, id: course?.id as number }).then(() => {
      setSnackbarVisible(true);
      queryClient.invalidateQueries(['courses']);
      queryClient.invalidateQueries(['all-courses']);
      queryClient.refetchQueries(['course', id]);
    });
  });

  const { control, handleSubmit, setValue } = useForm<CourseCreateArgs>();

  const onSubmit = useCallback(
    (data: CourseCreateArgs) => {
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
        {(error || professionsError) && (
          <Alert color="error">
            <AlertTitle>Ой! Кажется произошла ошибка</AlertTitle>
            {error?.message ?? professionsError?.message}
          </Alert>
        )}
        {course && (
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
                    name="title"
                    control={control}
                    defaultValue={course.title}
                    rules={{
                      required: {
                        value: true,
                        message: 'Поле обязательно для заполнения',
                      },
                    }}
                    render={({ field: { value, ...otherFields }, fieldState }) => (
                      <TextField
                        label="Название курса"
                        variant="outlined"
                        fullWidth
                        error={!!fieldState.error}
                        value={value ?? course.title}
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
                    defaultValue={course.url}
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
                        label="Ссылка на курс"
                        variant="outlined"
                        fullWidth
                        value={value ?? course.url}
                        error={!!fieldState.error}
                        helperText={fieldState.error?.message}
                        {...otherFields}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Controller
                    name="coverUrl"
                    control={control}
                    defaultValue={course.coverUrl}
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
                        label="Ссылка на обложку курса"
                        variant="outlined"
                        fullWidth
                        error={!!fieldState.error}
                        helperText={fieldState.error?.message}
                        value={value ?? course.coverUrl}
                        {...otherFields}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Controller
                    name="providerId"
                    control={control}
                    defaultValue={course.providerId}
                    rules={{
                      required: {
                        value: true,
                        message: 'Поле обязательно для заполнения',
                      },
                    }}
                    render={({ field: { value }, fieldState }) => (
                      <Autocomplete
                        options={courseProviders ?? []}
                        getOptionLabel={(option) => option?.name ?? ''}
                        noOptionsText={'Ничего не найдено'}
                        value={courseProviders?.find((p) => p.id === value) ?? null}
                        onChange={(event, newValue) => {
                          setValue('providerId', newValue?.id as number);
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Провайдер"
                            variant="outlined"
                            error={!!fieldState.error}
                            helperText={fieldState.error?.message}
                          />
                        )}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Controller
                    name="professionId"
                    control={control}
                    defaultValue={course.professionId}
                    rules={{
                      required: {
                        value: true,
                        message: 'Поле обязательно для заполнения',
                      },
                    }}
                    render={({ field: { value, ...otherFields }, fieldState }) => (
                      <FormControl fullWidth>
                        <InputLabel id="profession-select-label">Профессия</InputLabel>
                        <Select
                          labelId="profession-select-label"
                          id="profession-select"
                          label="Профессия"
                          error={!!fieldState.error}
                          value={value ?? course.professionId}
                          fullWidth
                          {...otherFields}
                        >
                          {professions?.map((profession) => (
                            <MenuItem key={profession.id} value={profession.id}>
                              {profession.name}
                            </MenuItem>
                          ))}
                        </Select>
                        {fieldState.error && (
                          <FormHelperText error>
                            {fieldState.error.message}
                          </FormHelperText>
                        )}
                      </FormControl>
                    )}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Controller
                    name="tags"
                    control={control}
                    defaultValue={course.tags}
                    render={({ field: { value, ...otherFields }, fieldState }) => (
                      <Autocomplete
                        multiple
                        id="tags-filled"
                        options={[]}
                        defaultValue={course.tags ?? ([] as string[])}
                        freeSolo
                        {...otherFields}
                        onChange={(e, v) => setValue('tags', v as string[])}
                        renderTags={(val, getTagProps) =>
                          val.map((option, index: number) => (
                            // eslint-disable-next-line react/jsx-key
                            <Chip
                              variant="outlined"
                              label={option}
                              {...getTagProps({ index })}
                            />
                          ))
                        }
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Метки"
                            placeholder="Введите метку и нажмите Enter"
                          />
                        )}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Controller
                    name="startsAt"
                    control={control}
                    defaultValue={course.startsAt}
                    rules={{
                      required: {
                        value: true,
                        message: 'Поле обязательно для заполнения',
                      },
                    }}
                    render={({ field: { value, ...restProps }, fieldState }) => (
                      <TextField
                        id="datetime-start-local"
                        label="Дата начала"
                        type="datetime-local"
                        fullWidth
                        {...restProps}
                        value={value ?? course.endsAt}
                        error={!!fieldState.error}
                        helperText={fieldState.error?.message}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Controller
                    name="endsAt"
                    control={control}
                    defaultValue={course.endsAt}
                    rules={{
                      required: {
                        value: true,
                        message: 'Поле обязательно для заполнения',
                      },
                    }}
                    render={({ field: { value, ...restProps }, fieldState }) => (
                      <TextField
                        id="datetime-end-local"
                        label="Дата окончания"
                        type="datetime-local"
                        value={value ?? course.endsAt}
                        fullWidth
                        {...restProps}
                        error={!!fieldState.error}
                        helperText={fieldState.error?.message}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Controller
                    name="description"
                    control={control}
                    defaultValue={course.description}
                    rules={{
                      required: {
                        value: true,
                        message: 'Поле обязательно для заполнения',
                      },
                    }}
                    render={({ field: { value, ...otherFields }, fieldState }) => (
                      <TextField
                        label="Описание"
                        variant="outlined"
                        multiline
                        rows={6}
                        fullWidth
                        error={!!fieldState.error}
                        value={value ?? course.description}
                        helperText={fieldState.error?.message}
                        {...otherFields}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Controller
                    name="isAdvanced"
                    control={control}
                    defaultValue={course.isAdvanced}
                    render={({ field }) => (
                      <>
                        <FormControlLabel
                          label={'Для продвинутых'}
                          control={
                            <Checkbox defaultChecked={field.value ?? course.isAdvanced} />
                          }
                          {...field}
                        />
                      </>
                    )}
                  />
                </Grid>
              </Grid>
            </CardContent>
            <CardActions sx={{ p: { xs: 2, md: 5 }, pt: { md: 2 } }}>
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
