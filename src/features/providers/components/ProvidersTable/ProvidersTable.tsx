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
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  deleteCourseProvider,
  ProvidersListResponse,
} from '@features/providers/providers.service';
import { ProviderFull, ProviderShort } from '@features/providers';

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

  const { courseProviders, pagination, isLoading, error } = useProviders({
    page: page.toString(),
  });
  console.log(courseProviders);

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
              <TableBody>
                {courseProviders?.map((courseProvider) => (
                  <TableRow key={courseProvider.id}>
                    <StyledTableCell>{courseProvider.name}</StyledTableCell>
                    <StyledTableCell width={40}>
                      <IconButton
                        component={Link}
                        to={`/admin/providers/${courseProvider.id}/edit`}
                      >
                        <Edit />
                      </IconButton>
                    </StyledTableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
    </>
  );
};
