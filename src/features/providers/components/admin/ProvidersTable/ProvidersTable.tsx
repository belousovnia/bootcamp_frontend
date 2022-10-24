import { useAllProviders } from '@features/providers/hooks/useAllProviders';
import { Edit } from '@mui/icons-material';
import {
  Alert,
  AlertTitle,
  Button,
  CircularProgress,
  IconButton,
  Paper,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { Link } from 'react-router-dom';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
  },
}));

export const ProvidersTable = () => {
  const { courseProviders, isLoading, error } = useAllProviders();

  return (
    <>
      {isLoading ? (
        <CircularProgress />
      ) : error ? (
        <Alert color="error">
          <AlertTitle>Ой! Кажется произошла ошибка</AlertTitle>
          {error.message}
        </Alert>
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
