import { useCurrentUser } from '@features/users/hooks';
import {
  Alert,
  Box,
  Card,
  CircularProgress,
  FormGroup,
  List,
  ListItem,
  styled,
  Typography,
} from '@mui/material';

const StyledListItemTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  fontSize: '1.2rem',
  color: theme.palette.text.primary,
}));

export const UserAccount = () => {
  const { user, isLoading, error } = useCurrentUser();

  return (
    <>
      <Typography variant="h3" component={'h1'} marginBottom={3}>
        Мой аккаунт
      </Typography>
      {isLoading && <CircularProgress />}
      {error && (
        <Box sx={{ mt: 3 }}>
          <Alert severity="error">
            Ой! Кажется произошла ошибка. Попробуйте перезагрузить страницу.
          </Alert>
        </Box>
      )}
      {user && (
        <Card sx={{ p: { xs: 3 } }}>
          <List>
            <ListItem>
              <FormGroup>
                <StyledListItemTitle>Email</StyledListItemTitle>
                <Typography>{user.auth.email}</Typography>
              </FormGroup>
            </ListItem>
            <ListItem>
              <FormGroup>
                <StyledListItemTitle>Имя</StyledListItemTitle>
                <Typography>{user.name ?? 'Не указано'}</Typography>
              </FormGroup>
            </ListItem>
            <ListItem>
              <FormGroup>
                <StyledListItemTitle>Фамилия</StyledListItemTitle>
                <Typography>{user.surname ?? 'Не указана'}</Typography>
              </FormGroup>
            </ListItem>
            <ListItem>
              <FormGroup>
                <StyledListItemTitle>Отчество</StyledListItemTitle>
                <Typography>{user.patronymic ?? 'Не указано'}</Typography>
              </FormGroup>
            </ListItem>
          </List>
        </Card>
      )}
    </>
  );
};
