import { CourseProviderFull } from '@features/courses/cources.entity';
import { useCourseProvider } from '@features/courses/hooks/useCourseProvider';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  Grid,
  styled,
  TextField,
  Typography,
} from '@mui/material';
import { useEffect, useMemo } from 'react';
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
  // const [uploadedLogoFile, setUploadedLogoFile] = useState<File | null>(null);
  const { control, handleSubmit, reset } = useForm({
    defaultValues: useMemo(() => provider, [provider]),
  });

  useEffect(() => {
    reset(provider);
  }, [provider]);

  const onSubmit = (data: CourseProviderFull) => {
    console.log('submitted');
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <>
        {isLoading && <CircularProgress />}

        {provider && (
          <Card>
            <CardContent sx={{ p: { md: 3 } }}>
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
                        defaultValue={provider.name}
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
                        defaultValue={provider.url}
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
                    name="shortDescription"
                    control={control}
                    rules={{
                      required: {
                        value: true,
                        message: 'Поле обязательно для заполнения',
                      },
                    }}
                    render={({ field, fieldState }) => (
                      <TextField
                        label="Краткое описание"
                        variant="outlined"
                        multiline
                        defaultValue={provider.url}
                        rows={4}
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
                        defaultValue={provider.url}
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
                  <Typography component={'h4'} variant="h5" sx={{ mb: 2 }}>
                    Логотип компании
                  </Typography>
                  <Controller
                    name="coverUrl"
                    control={control}
                    rules={{
                      required: {
                        value: true,
                        message: 'Поле обязательно для заполнения',
                      },
                    }}
                    render={({ field }) =>
                      field?.value ? (
                        <>
                          <LogoWrapper sx={{ mb: 3 }}>
                            <Logo src={field.value} alt="cover" />
                          </LogoWrapper>
                          <Button variant="contained" component="label">
                            Загрузить новый логотип
                            <input
                              hidden
                              accept="image/*"
                              multiple
                              type="file"
                              ref={field.ref}
                              name={field.name}
                              onChange={(e) => console.log(e.target.files)}
                              onBlur={field.onBlur}
                            />
                          </Button>
                        </>
                      ) : (
                        <Button variant="contained" component="label">
                          Загрузить логотип
                          <input
                            hidden
                            accept="image/*"
                            multiple
                            type="file"
                            ref={field.ref}
                            name={field.name}
                            onChange={field.onChange}
                            onBlur={field.onBlur}
                          />
                        </Button>
                      )
                    }
                  />
                </Grid>
              </Grid>
            </CardContent>
            <CardActions sx={{ p: { md: 3 } }}>
              <Button type="submit" size="large" variant="contained">
                Сохранить
              </Button>
            </CardActions>
          </Card>
        )}
      </>
    </form>
  );
};
