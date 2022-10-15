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
  coverUrl,
  provider,
  startMskDateTime,
  endMskDateTime,
}: CoursesListCardProps) => {
  const formattedDateStart = dayjs(startMskDateTime).format('DD.MM.YYYY');
  const formattedDateEnd = dayjs(endMskDateTime).format('DD.MM.YYYY');
  return (
    <Card>
      <CardActionArea component={Link} to={`/courses/${id}`}>
        <CardMedia
          component={'img'}
          image={coverUrl}
          alt={name}
          width={672}
          height={320}
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
