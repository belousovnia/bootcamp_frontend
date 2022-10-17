import { CourseShort } from '@features/courses/cources.entity';
import { CoursesListResponse } from '@features/courses/courses.service';
import { useCourses } from '@features/courses/hooks/useCourses';
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
import { deleteCourseProvider } from '@features/providers/providers.service';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
  },
}));

export const CoursesTable = () => {
  const [page, setPage] = useState(1);
  const client = useQueryClient();

  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const { courses, pagination, isLoading, error } = useCourses(page, {});

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
        await client.cancelQueries(['courses', page]);
        const previousCoursesData = client.getQueryData(['courses', page]);
        client.setQueryData<CoursesListResponse | undefined>(
          ['courses', page],
          (oldData) => {
            return (
              oldData && {
                ...oldData,
                courses: oldData.courses.filter(
                  (item: CourseShort) => item.id !== idToDelete,
                ),
              }
            );
          },
        );
        return { previousCoursesData };
      },
    },
  );

  return (
    <>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <>
          <Button variant="contained" component={Link} to="/admin/courses/new">
            Добавить курс
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
                {courses?.map((course) => (
                  <TableRow key={course.id}>
                    <StyledTableCell>{course.title}</StyledTableCell>
                    <StyledTableCell width={80}>
                      <IconButton
                        component={Link}
                        to={`/admin/courses/${course.id}/edit`}
                      >
                        <Edit />
                      </IconButton>
                      <IconButton onClick={() => mutate(course.id)}>
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
          Курс успешно удален
        </Alert>
      </Snackbar>
    </>
  );
};
