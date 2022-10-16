import { Box, CircularProgress } from '@mui/material';

interface ContainerLoaderProps {
  children: React.ReactNode;
  isLoading: boolean;
  loaderPosition?: 'center' | 'top';
}

export const ContainerLoader = (props: ContainerLoaderProps) => {
  const { children, isLoading } = props;

  return (
    <Box sx={{ position: 'relative' }}>
      {children}
      {isLoading && (
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: 1,
            backgroundColor: 'rgba(255, 255, 255, 0.3)',
            display: 'flex',
            alignItems: props.loaderPosition === 'center' ? 'center' : 'flex-start',
            paddingTop: props.loaderPosition === 'center' ? 0 : 20,
            justifyContent: 'center',
          }}
        >
          <CircularProgress size="4rem" />
        </Box>
      )}
    </Box>
  );
};
