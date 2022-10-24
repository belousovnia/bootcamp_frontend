import { Button, Card, Grid, Stack, styled, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const ImageWrapper = styled('div')`
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: ${({ theme }) => theme.shape.borderRadius}px;
  overflow: hidden;
`;

const PromoImage = styled('img')`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const MainPromoSection = () => {
  return (
    <Card component={'section'} sx={{ p: { xs: 2, md: 2, lg: 4 } }}>
      <Grid container spacing={{ xs: 4, lg: 5 }}>
        <Grid item xs={12} md={7}>
          <Typography variant={'h2'} component="h1" sx={{ mb: 3 }}>
            Помогаем в выборе IT профессии
          </Typography>
          <Typography
            variant={'h6'}
            component="h2"
            sx={{ maxWidth: '600px', fontWeight: 'normal' }}
          >
            Тест позволит определить, какая IT профессия подходит вам больше всего. Мы
            верим, что какую бы профессию вы ни выбрали - вас обязательно ждет успех!
          </Typography>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={{ xs: 1, md: 2 }}
            marginTop={{ xs: 5 }}
            sx={{ textAlign: 'center' }}
          >
            <Button
              variant="outlined"
              color="primary"
              size="large"
              component={Link}
              to="/professions"
              sx={{ flexGrow: 1, py: { xs: 2, md: 3 }, fontSize: { lg: 'larger' } }}
            >
              Список профессий
            </Button>
            <Button
              variant="contained"
              color="primary"
              size="large"
              component={Link}
              to="/survey"
              sx={{ flexGrow: 1, py: { xs: 2, md: 3 }, fontSize: { lg: 'larger' } }}
            >
              Подобрать IT профессию
            </Button>
          </Stack>
        </Grid>
        <Grid display={{ xs: 'none', md: 'flex' }} item md={5}>
          <ImageWrapper>
            <PromoImage src="/images/promo.jpg" />
          </ImageWrapper>
        </Grid>
      </Grid>
    </Card>
  );
};
