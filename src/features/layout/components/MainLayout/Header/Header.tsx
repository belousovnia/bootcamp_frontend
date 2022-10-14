import { useSurveyResultsStore } from '@features/survey/hooks';
import { Menu, AccountCircle } from '@mui/icons-material';
import {
  Button,
  Container,
  Drawer,
  IconButton,
  List,
  ListItem,
  Stack,
  Toolbar,
  AppBar,
} from '@mui/material';
import { styled } from '@mui/system';
import { Logo } from '@ui-library/components/Logo';
import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '@features/auth';

type NavLink = {
  title: string;
  path: string;
  variant: 'text' | 'outlined' | 'contained';
};

const navLinks: NavLink[] = [
  { title: 'Профессии', path: '/professions', variant: 'text' },
  { title: 'Курсы', path: '/courses', variant: 'text' },
  { title: 'Пройти тест', path: '/survey', variant: 'contained' },
];

const StyledNav = styled('nav')(({ theme }) => ({
  display: 'none',
  [theme.breakpoints.up('md')]: {
    display: 'block',
  },
}));

const StyledLeftStack = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  [theme.breakpoints.up('md')]: {
    justifyContent: 'space-between',
  },
}));

const StyledLogoLink = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  transition: 'all 0.3s ease',
  color: 'inherit',
  '&:hover': {
    opacity: 0.7,
  },
  '&:visited': {
    color: 'inherit',
  },
}));

export const Header = () => {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  const [currentStep, surveyState] = useSurveyResultsStore((state) => [
    state.currentStep,
    state.surveyState,
  ]);

  const surveyPath = useMemo(() => {
    if (surveyState === 'in-progress') {
      return `/survey/step/${currentStep}`;
    }
    if (surveyState === 'completed') {
      return '/survey/finish';
    }
    return '/survey';
  }, [currentStep, surveyState]);

  const isLogged = useAuthStore((store) => store.isAuth);
  return (
    <AppBar
      position="static"
      color="transparent"
      sx={{ py: 1, backgroundColor: 'background.paper' }}
    >
      <Container>
        <Toolbar sx={{ justifyContent: 'space-between' }} disableGutters>
          <StyledLeftStack>
            <IconButton
              edge="start"
              color="primary"
              aria-label="open mobile menu"
              size="large"
              sx={{ display: { xs: 'flex', md: 'none' }, mr: { sm: 2 } }}
              onClick={() => setMobileDrawerOpen(true)}
            >
              <Menu sx={{ width: 30, height: 30 }} />
            </IconButton>
            <StyledLogoLink to="/">
              <Logo />
            </StyledLogoLink>
          </StyledLeftStack>

          <StyledNav>
            <Stack
              direction={'row'}
              spacing={2}
              component="ul"
              sx={{ pl: 0, listStyle: 'none' }}
              flexGrow={1}
            >
              {navLinks.map((link) => (
                <li key={link.title}>
                  <Button
                    key={link.title}
                    component={Link}
                    to={link.path.includes('survey') ? surveyPath : link.path}
                    variant={link.variant}
                    sx={{ py: 1 }}
                  >
                    {link.title}
                  </Button>
                </li>
              ))}
            </Stack>
          </StyledNav>
          <Stack direction="row" spacing={'0.5rem'}>
            {isLogged ? (
              <IconButton size="large" edge="end">
                <AccountCircle color="primary" fontSize="inherit"></AccountCircle>
              </IconButton>
            ) : (
              <>
                <Button
                  size={'small'}
                  component={Link}
                  to={'/login'}
                  variant={'outlined'}
                  sx={{ py: 1 }}
                >
                  Войти
                </Button>
                <Button
                  size={'small'}
                  component={Link}
                  to={'/registration'}
                  variant={'outlined'}
                  sx={{ py: 1 }}
                >
                  Регистрация
                </Button>
              </>
            )}
          </Stack>
        </Toolbar>
      </Container>
      <Drawer
        open={mobileDrawerOpen}
        onClose={() => setMobileDrawerOpen(false)}
        sx={{ p: 3 }}
      >
        <List>
          {navLinks.map((link) => (
            <ListItem key={link.title} disablePadding>
              <Button
                sx={{
                  width: '200px',
                  p: 2,
                  justifyContent: 'flex-start',
                  borderRadius: 0,
                }}
                component={Link}
                to={link.path}
                variant={link.variant}
              >
                {link.title}
              </Button>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </AppBar>
  );
};
