import React from 'react';
import { ProfessionEntity } from '@features/professions/professions.entity';
import {
  Button,
  CardMedia,
  Card,
  CardActionArea,
  CardHeader,
  CardContent,
} from '@mui/material';
import { Link } from 'react-router-dom';

interface ProfessionCardProps {
  profession: ProfessionEntity;
}

export const ProfessionCard: React.FC<ProfessionCardProps> = ({ profession }) => {
  return (
    <Card raised>
      <CardActionArea
        component={Link}
        to={`/professions/${profession.id}`}
        sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      >
        <CardHeader title={profession.name} />
        <CardMedia
          component={'img'}
          image={profession.coverUrl}
          alt={'Фон карточки'}
          sx={{ height: 125, objectFit: 'fill' }}
        />
        <CardContent>
          <Button variant={'contained'} size={'large'}>
            Подробнее
          </Button>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
