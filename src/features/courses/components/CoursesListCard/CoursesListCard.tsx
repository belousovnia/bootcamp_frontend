import { Course } from '@features/courses/cources.entity';
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  CardMedia,
  styled,
  Typography,
} from '@mui/material';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';

interface CoursesListCardProps extends Course {
  onClick?: () => void;
}

export const CoursesListCard = ({
  id,
  name,
  image,
  tags,
  provider,
  dateStart,
  dateEnd,
}: CoursesListCardProps) => {
  const formattedDateStart = dayjs(dateStart).format('DD.MM.YYYY');
  const formattedDateEnd = dayjs(dateEnd).format('DD.MM.YYYY');
  return (
    <Card>
      <CardActionArea component={Link} to={`/courses/${id}`}>
        <CardMedia
          component={'img'}
          image={image.url}
          alt={name}
          width={image.width}
          height={image.height}
          sx={{ maxHeight: 160 }}
        />
      </CardActionArea>
      <CardActionArea component={Link} to={`/courses/${id}`}>
        <CardContent>
          <Typography component="p" variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            {provider.name}
          </Typography>
          <Box sx={{ mb: 1 }} typography={'body2'}>
            {formattedDateStart} – {formattedDateEnd}
          </Box>
          <Typography variant="h6" component="h3">
            {name}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
