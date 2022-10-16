import { Box, BoxProps, styled } from '@mui/material';

interface TypographyContainerProps extends BoxProps {
  children?: React.ReactNode;
}

const StyledTypographyContainer = styled(Box)`
  line-height: 1.5;
  color: ${({ theme }) => theme.palette.text.primary};
  & > *:first-child {
    margin-top: 0;
  }
  & ul {
    list-style: none;
  }
  & ul li {
    &::before {
      content: '•';
      color: ${({ theme }) => theme.palette.primary.main};
      display: inline-block;
      width: 1em;
      margin-left: -1em;
    }
  }
  & h2 {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
    @media (min-width: ${({ theme }) => theme.breakpoints.values.md}px) {
      font-size: 2rem;
    }
  }
  & h3 {
    font-size: 1.25rem;
    margin-bottom: 0.5rem;
    @media (min-width: ${({ theme }) => theme.breakpoints.values.md}px) {
      font-size: 1.5rem;
    }
  }
  & h4 {
    font-size: 1.125rem;
    margin-bottom: 0.5rem;
    @media (min-width: ${({ theme }) => theme.breakpoints.values.md}px) {
      font-size: 1.25rem;
    }
  }
  & h5 {
    font-size: 1rem;
    margin-bottom: 0.5rem;
    @media (min-width: ${({ theme }) => theme.breakpoints.values.md}px) {
      font-size: 1.125rem;
    }
  }
`;

export const TypographyContainer = ({
  children,
  ...otherProps
}: TypographyContainerProps) => {
  return (
    <StyledTypographyContainer {...otherProps}>{children}</StyledTypographyContainer>
  );
};
