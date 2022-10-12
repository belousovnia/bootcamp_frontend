import { Typography } from '@mui/material';

interface CourseDetailsContentProps {
  description: string;
}

export const CourseDetailsContent = ({ description }: CourseDetailsContentProps) => {
  return (
    <>
      <Typography component={'h2'} variant="h4" sx={{ mb: 1 }}>
        Описание курса
      </Typography>
      <div
        dangerouslySetInnerHTML={{ __html: description }}
        style={{ lineHeight: 1.5 }}
      ></div>
    </>
  );
};
