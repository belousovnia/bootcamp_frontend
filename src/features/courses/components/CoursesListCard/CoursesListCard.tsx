import { CourseShort } from '@features/courses/cources.entity';
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';

interface CoursesListCardProps extends CourseShort {
  onClick?: () => void;
}

export const CoursesListCard = ({
  id,
  name,
  image,
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
      <CardContent sx={{ p: { md: 3 } }}>
        <Typography component="p" variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          {provider.name}
        </Typography>
        <Box sx={{ mb: 1 }} typography={'body2'}>
          {formattedDateStart} – {formattedDateEnd}
        </Box>
        <Typography variant="h5" component="h3">
          {name}
        </Typography>
      </CardContent>
      <CardActions sx={{ p: { md: 2 } }}>
        <Button variant="outlined" component={Link} to={`/courses/${id}`} fullWidth>
          Открыть курс
        </Button>
      </CardActions>
    </Card>
  );
};
