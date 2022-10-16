import { Box, Typography } from '@mui/material';
import { TypographyContainer } from '@ui-library/components/TypographyContainer';

interface CourseDetailsContentProps {
  description: string;
  isTruncated?: boolean;
}

export const CourseDetailsContent = ({
  description,
  isTruncated = false,
}: CourseDetailsContentProps) => {
  const truncatedSx = {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    WebkitLineClamp: 5,
    WebkitBoxOrient: 'vertical',
    mb: 2,
  };

  return (
    <>
      <Typography component={'h2'} variant="h4" sx={{ mb: 3 }}>
        Описание курса
      </Typography>
      <TypographyContainer
        dangerouslySetInnerHTML={{ __html: description }}
        sx={isTruncated ? truncatedSx : undefined}
      />
    </>
  );
};
