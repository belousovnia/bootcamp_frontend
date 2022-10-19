import { useSurveyResultsStore } from '@features/survey/hooks';
import { AccountCircle, Menu as MenuIcon } from '@mui/icons-material';
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
  Box,
  Menu,
  MenuItem,
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
  const [userMenuAnchorEl, setUserMenuAnchorEl] = useState<null | HTMLElement>(null);
  const userMenuOpen = Boolean(userMenuAnchorEl);

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

  const handleUserMenuClose = () => {
    setUserMenuAnchorEl(null);
  };
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
              <MenuIcon sx={{ width: 30, height: 30 }} />
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
              <>
                <IconButton
                  size="large"
                  edge="end"
                  aria-haspopup="true"
                  aria-expanded={userMenuOpen ? 'true' : undefined}
                  onClick={(event) => setUserMenuAnchorEl(event.currentTarget)}
                >
                  <AccountCircle color="primary" fontSize="inherit"></AccountCircle>
                </IconButton>
                <Menu
                  anchorEl={userMenuAnchorEl}
                  open={userMenuOpen}
                  onClose={() => setUserMenuAnchorEl(null)}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                >
                  <MenuItem
                    onClick={handleUserMenuClose}
                    component={Link}
                    to="/user/account"
                  >
                    Мой аккаунт
                  </MenuItem>
                  <MenuItem onClick={handleUserMenuClose}>Выход</MenuItem>
                </Menu>
              </>
            ) : (
              <Box display={{ xs: 'none', sm: 'flex' }}>
                <Button
                  size={'small'}
                  component={Link}
                  to={'/login'}
                  variant={'outlined'}
                  sx={{ py: 1, ml: 2 }}
                >
                  Войти
                </Button>
                <Button
                  size={'small'}
                  component={Link}
                  to={'/registration'}
                  variant={'outlined'}
                  sx={{ py: 1, ml: 2 }}
                >
                  Регистрация
                </Button>
              </Box>
            )}
          </Stack>
        </Toolbar>
      </Container>
      <Drawer
        open={mobileDrawerOpen}
        onClose={() => setMobileDrawerOpen(false)}
        sx={{ p: 3, display: 'flex', flexDirection: 'column' }}
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
                onClick={() => setMobileDrawerOpen(false)}
              >
                {link.title}
              </Button>
            </ListItem>
          ))}
        </List>
        <Stack direction={'column'} sx={{ p: 2, mt: 'auto' }} spacing={2}>
          <Button
            size={'large'}
            component={Link}
            to={'/login'}
            variant={'outlined'}
            fullWidth
            sx={{ py: 1 }}
            onClick={() => setMobileDrawerOpen(false)}
          >
            Войти
          </Button>
          <Button
            size={'large'}
            component={Link}
            to={'/registration'}
            variant={'outlined'}
            fullWidth
            sx={{ py: 1 }}
            onClick={() => setMobileDrawerOpen(false)}
          >
            Регистрация
          </Button>
        </Stack>
      </Drawer>
    </AppBar>
  );
};
