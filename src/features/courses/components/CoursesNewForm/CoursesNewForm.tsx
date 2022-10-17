import { CourseFull } from '@features/courses/cources.entity';
import {
  CourseCreateArgs,
  createCourse,
  updateCourse,
} from '@features/courses/courses.service';
import { useCourse } from '@features/courses/hooks/useCourse';
import { useProviders } from '@features/providers/hooks/useProviders';
import {
  Alert,
  Autocomplete,
  Button,
  Card,
  CardActions,
  CardContent,
  Checkbox,
  CircularProgress,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Rating,
  Select,
  Snackbar,
  styled,
  TextField,
  Typography,
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

export const CoursesNewForm = () => {
  const [courseProviderName, setCourseProviderName] = useState('');
  const { courseProviders } = useProviders(
    {
      page: '1',
      search: courseProviderName,
    },
    { enabled: !!courseProviderName },
  );

  console.log(courseProviders);

  const { control, handleSubmit, reset } = useForm<CourseCreateArgs>();

  const [snackbarVisible, setSnackbarVisible] = useState(false);

  const {
    mutate,
    isLoading: isMutationLoading,
    isSuccess: isMutationSuccess,
  } = useMutation((data: CourseCreateArgs) => {
    return createCourse(data).then(() => {
      setSnackbarVisible(true);
      reset({
        title: '',
        description: '',
        url: '',
        coverUrl: '',
        providerId: undefined,
        professionId: undefined,
        isAdvanced: false,
      });
    });
  });

  const onSubmit = useCallback(
    (data: CourseCreateArgs) => {
      if (!isMutationLoading) {
        mutate(data);
      }
    },
    [isMutationLoading, mutate],
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
      <>
        <Card>
          <CardContent sx={{ p: { xs: 3, md: 5 } }}>
            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                <Controller
                  name="title"
                  control={control}
                  defaultValue={''}
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
                      defaultValue={''}
                      fullWidth
                      error={!!fieldState.error}
                      value={value}
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
                  defaultValue={''}
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
                      defaultValue={''}
                      value={value}
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
                  defaultValue={''}
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
                      defaultValue={''}
                      error={!!fieldState.error}
                      helperText={fieldState.error?.message}
                      value={value}
                      {...otherFields}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Controller
                  name="providerId"
                  control={control}
                  defaultValue={''}
                  rules={{
                    required: {
                      value: true,
                      message: 'Поле обязательно для заполнения',
                    },
                  }}
                  render={({ field: { value, ...otherFields }, fieldState }) => (
                    <Autocomplete
                      options={courseProviders ?? []}
                      getOptionLabel={(option) => option?.title ?? ''}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Провайдер"
                          variant="outlined"
                          fullWidth
                          error={!!fieldState.error}
                          helperText={fieldState.error?.message}
                        />
                      )}
                      {...otherFields}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Controller
                  name="professionId"
                  control={control}
                  defaultValue={''}
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
                        value={value}
                        defaultValue={''}
                        fullWidth
                        {...otherFields}
                      >
                        <MenuItem value={0}>Не выбрано</MenuItem>
                        <MenuItem value={1}>Программирование</MenuItem>
                        <MenuItem value={2}>Веб-дизайн</MenuItem>
                        <MenuItem value={3}>Аналитика</MenuItem>
                        <MenuItem value={4}>Тестирование</MenuItem>
                        <MenuItem value={5}>Администрирование</MenuItem>
                      </Select>
                      {fieldState.error && (
                        <FormHelperText error>{fieldState.error.message}</FormHelperText>
                      )}
                    </FormControl>
                  )}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Controller
                  name="startsAt"
                  control={control}
                  defaultValue={''}
                  rules={{
                    required: {
                      value: true,
                      message: 'Поле обязательно для заполнения',
                    },
                  }}
                  render={({ field }) => (
                    <TextField
                      id="datetime-start-local"
                      label="Дата начала"
                      type="datetime-local"
                      defaultValue={''}
                      fullWidth
                      {...field}
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
                  defaultValue={''}
                  rules={{
                    required: {
                      value: true,
                      message: 'Поле обязательно для заполнения',
                    },
                  }}
                  render={({ field }) => (
                    <TextField
                      id="datetime-end-local"
                      label="Дата окончания"
                      type="datetime-local"
                      defaultValue={''}
                      fullWidth
                      {...field}
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
                  defaultValue={''}
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
                      defaultValue={''}
                      multiline
                      rows={6}
                      fullWidth
                      error={!!fieldState.error}
                      value={value}
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
                  defaultValue={false}
                  render={({ field }) => (
                    <>
                      <FormControlLabel
                        label={'Для продвинутых'}
                        control={<Checkbox defaultChecked={field.value ?? false} />}
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
            Курс успешно создан
          </Alert>
        </Snackbar>
      </>
    </form>
  );
};
