import { Box, styled, Typography } from '@mui/material';
import { BoxProps } from '@mui/system';
import { TypographyContainer } from '@ui-library/components/TypographyContainer';

interface CourseDetailsContentProps {
  description: string;
  isTruncated?: boolean;
}

const TruncatedContainer = styled(Box)<BoxProps<'div', { isTruncated: boolean }>>(
  ({ isTruncated, theme }) => ({
    maxHeight: isTruncated ? '200px' : 'none',
    position: 'relative',
    overflow: 'hidden',
    '&:after': {
      content: '""',
      display: isTruncated ? 'block' : 'none',
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      height: '50px',
      background: `linear-gradient(180deg, rgba(255,255,255,0) 0%, ${theme.palette.background.default} 100%)`,
    },
  }),
);

export const CourseDetailsContent = ({
  description,
  isTruncated = false,
}: CourseDetailsContentProps) => {
  return (
    <>
      <Typography component={'h2'} variant="h4" sx={{ mb: 3 }}>
        Описание курса
      </Typography>
      <TruncatedContainer isTruncated={isTruncated}>
        <TypographyContainer
          dangerouslySetInnerHTML={{ __html: description }}
          sx={{
            whiteSpace: 'pre-wrap',
          }}
        />
      </TruncatedContainer>
    </>
  );
};
