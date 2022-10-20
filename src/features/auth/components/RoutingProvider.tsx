import { useAuthStore, useCurrentUser } from '@features/auth/auth.hooks';
import { CurrentUserRoles } from '@features/auth';
import React, { useMemo } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { Box, CircularProgress } from '@mui/material';

interface ProtectedRouteProps {
  role: CurrentUserRoles;
  children?: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  role = CurrentUserRoles.ROLE_REGULAR,
  children,
}) => {
  const currentUser = useCurrentUser();
  const { isAuth } = useAuthStore();

  const isAvailable = useMemo(() => {
    if (currentUser.data?.role === CurrentUserRoles.ROLE_ADMIN) return true;
    else if (currentUser.data?.role === CurrentUserRoles.ROLE_MODERATOR)
      return role !== CurrentUserRoles.ROLE_ADMIN;
    else return role === CurrentUserRoles.ROLE_REGULAR;
  }, [currentUser]);

  const location = useLocation();

  if (currentUser.isLoading) {
    return (
      <Box sx={{ position: 'absolute', left: '50%', top: '40%' }}>
        <CircularProgress size="8rem" />
      </Box>
    );
  } else if (!isAuth) {
    return <Navigate to={'/login'} replace state={{ from: location }} />;
  } else if (isAvailable) {
    return <>{children}</>;
  }
  return <Navigate to={'/'} replace />;
};
