import { useCourseProviders } from '@features/courses/hooks/useCourseProviders';
import { Delete, Edit } from '@mui/icons-material';
import {
  CircularProgress,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export const CourseProvidersTable = () => {
  const [page, setPage] = useState(1);
  const { courseProviders, isLoading, error } = useCourseProviders(page.toString());

  return (
    <>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell colSpan={2}>Название</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {courseProviders?.map((courseProvider) => (
                <TableRow key={courseProvider.id}>
                  <TableCell>{courseProvider.name}</TableCell>
                  <TableCell width={80}>
                    <IconButton
                      component={Link}
                      to={`/admin/course-providers/${courseProvider.id}/edit`}
                    >
                      <Edit />
                    </IconButton>
                    <IconButton>
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
};
