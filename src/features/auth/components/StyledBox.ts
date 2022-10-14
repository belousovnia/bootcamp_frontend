import { styled } from '@mui/system';
import { Box } from '@mui/material';

export const StyledBox = styled(Box)(({ theme }) => ({
  width: '25rem',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
}));
