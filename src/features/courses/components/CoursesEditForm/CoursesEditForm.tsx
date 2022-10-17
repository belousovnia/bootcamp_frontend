import { CourseFull } from '@features/courses/cources.entity';
import { CourseProviderFull } from '@features/courses/cources.entity';
import { updateCourse, updateCourseProvider } from '@features/courses/courses.service';
import { useCourse } from '@features/courses/hooks/useCourse';
import { useCourseProvider } from '@features/courses/hooks/useCourseProvider';
import { useCourseProviders } from '@features/courses/hooks/useCourseProviders';
import {
  Alert,
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

export const CoursesEditForm = () => {
  const { id } = useParams<{ id: string }>();
  const { course, isLoading } = useCourse(id || '');
  const { courseProviders } = useCourseProviders({ page: '1' });
  const [snackbarVisible, setSnackbarVisible] = useState(false);

  const {
    mutate,
    isLoading: isMutationLoading,
    isSuccess: isMutationSuccess,
  } = useMutation((data: CourseFull) => {
    return updateCourse({ id: course?.id as string, changes: data }).then(() => {
      setSnackbarVisible(true);
    });
  });

  const { control, handleSubmit } = useForm<CourseFull>();

  const onSubmit = useCallback(
    (data: CourseFull) => {
      if (!isMutationLoading) {
        mutate(data);
      }
    },
    [isMutationLoading, mutate],
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* <>
        {isLoading && <CircularProgress />}

        {course && (
          <Card>
            <CardContent sx={{ p: { xs: 3, md: 5 } }}>
              <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                  <Controller
                    name="name"
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
                        defaultValue={course.title}
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
                        defaultValue={course.url}
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
                        defaultValue={course.coverUrl}
                        error={!!fieldState.error}
                        helperText={fieldState.error?.message}
                        {...otherFields}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Controller
                    name="provider.id"
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
                        <InputLabel id="course-provider-select-label">
                          Создатель курса
                        </InputLabel>
                        <Select
                          labelId="course-provider-select-label"
                          id="course-provider-select"
                          label="Создатель курса"
                          error={!!fieldState.error}
                          value={value}
                          defaultValue={course.provider.id}
                          fullWidth
                          {...otherFields}
                        >
                          {courseProviders?.map((provider) => (
                            <MenuItem key={provider.id} value={provider.id}>
                              {provider.title}
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
                    name="startMskDateTime"
                    control={control}
                    defaultValue={course.startsAt}
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
                        defaultValue={course.startsAt}
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
                    name="endMskDateTime"
                    control={control}
                    defaultValue={course.endsAt}
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
                        defaultValue={course.endsAt}
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
                    name="profession.id"
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
                          defaultValue={course.profession.id}
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
                          <FormHelperText error>
                            {fieldState.error.message}
                          </FormHelperText>
                        )}
                      </FormControl>
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
                        defaultValue={course.description}
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
                    name="isForAdvancedStudents"
                    control={control}
                    defaultValue={course.isAdvanced}
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
                <Grid item xs={12} md={6}>
                  <Controller
                    name="isIndefinite"
                    control={control}
                    defaultValue={course.isIndefinite}
                    render={({ field }) => (
                      <>
                        <FormControlLabel
                          label={'Является бессрочным'}
                          control={<Checkbox defaultChecked={field.value ?? false} />}
                          {...field}
                        />
                      </>
                    )}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <Controller
                    name="isArchived"
                    control={control}
                    defaultValue={course.isArchived}
                    render={({ field }) => (
                      <>
                        <FormControlLabel
                          label={'Находится в архиве'}
                          control={<Checkbox defaultChecked={field.value ?? false} />}
                          {...field}
                        />
                      </>
                    )}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Controller
                    name="internalRating"
                    control={control}
                    defaultValue={course.internalRating}
                    rules={{
                      required: {
                        value: true,
                        message: 'Поле обязательно для заполнения',
                      },
                    }}
                    render={({ field }) => (
                      <>
                        <Typography component="legend" sx={{ mb: '3px' }}>
                          Внутренний рейтинг
                        </Typography>
                        <Rating {...field} />
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
      </> */}
    </form>
  );
};
