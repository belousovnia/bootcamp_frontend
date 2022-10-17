import { useProviders } from '@features/providers/hooks/useProviders';
import { Delete, Edit } from '@mui/icons-material';
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  IconButton,
  Pagination,
  Paper,
  Snackbar,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import {
  MutationFunction,
  Updater,
  useMutation,
  useQueryClient,
  UseQueryResult,
} from '@tanstack/react-query';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  deleteCourseProvider,
  ProvidersListResponse,
} from '@features/providers/providers.service';
import { ProviderShort } from '@features/providers';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
  },
}));

export const ProvidersTable = () => {
  const [page, setPage] = useState(1);
  const client = useQueryClient();

  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const { courseProviders, pagination, isLoading, error } = useProviders({
    page: page.toString(),
  });

  console.log(courseProviders);

  const {
    mutate,
    isLoading: isDeletionLoading,
    isSuccess: isDeletionSuccess,
  } = useMutation(
    (id: string) => {
      return deleteCourseProvider({ id }).then(() => {
        setSnackbarVisible(true);
      });
    },
    {
      onMutate: async (idToDelete) => {
        await client.cancelQueries(['providers', page.toString()]);
        const previousCourseProvidersData = client.getQueryData([
          'providers',
          page.toString(),
        ]);
        client.setQueryData<ProvidersListResponse | undefined>(
          ['providers', page.toString()],
          (oldData) => {
            return (
              oldData && {
                ...oldData,
                providers: oldData.providers.filter(
                  (item: ProviderShort) => item.id !== idToDelete,
                ),
              }
            );
          },
        );
        return { previousCourseProvidersData };
      },
    },
  );

  return (
    <>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <>
          <Button variant="contained" component={Link} to="/admin/providers/new">
            Добавить создателя курсов
          </Button>
          <TableContainer component={Paper} sx={{ mt: 2 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <StyledTableCell colSpan={2}>Название</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody
                sx={{
                  opacity: isDeletionLoading ? 0.5 : 1,
                  pointerEvents: isDeletionLoading ? 'none' : 1,
                }}
              >
                {courseProviders?.map((courseProvider) => (
                  <TableRow key={courseProvider.id}>
                    <StyledTableCell>{courseProvider.title}</StyledTableCell>
                    <StyledTableCell width={80}>
                      <IconButton
                        component={Link}
                        to={`/admin/providers/${courseProvider.id}/edit`}
                      >
                        <Edit />
                      </IconButton>
                      <IconButton onClick={() => mutate(courseProvider.id)}>
                        <Delete />
                      </IconButton>
                    </StyledTableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          {pagination && (
            <Box sx={{ mt: 4, justifyContent: 'center', display: 'flex' }}>
              <Pagination
                count={pagination.totalPages}
                page={page}
                shape="rounded"
                variant="outlined"
                onChange={(_, value) => setPage(value)}
              />
            </Box>
          )}
        </>
      )}

      <Snackbar
        open={snackbarVisible && isDeletionSuccess}
        autoHideDuration={6000}
        onClose={() => setSnackbarVisible(false)}
        onClick={() => setSnackbarVisible(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          severity="success"
          sx={{ width: '100%', border: 1, borderColor: 'primary.main' }}
        >
          Создатель курса успешно удален
        </Alert>
      </Snackbar>
    </>
  );
};
