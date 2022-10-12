import { Card, CardTypeMap, styled } from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';

export const SurveyCard = styled(Card)`
  max-width: 800px;
  margin: 0 auto;
  @media (min-width: ${({ theme }) => theme.breakpoints.values.md}px) {
    & .MuiCardHeader-root {
      padding: ${({ theme }) => theme.spacing(3)};
    }
    & .MuiCardContent-root {
      padding: ${({ theme }) => theme.spacing(3)};
    }
    & .MuiCardActions-root {
      padding: ${({ theme }) => theme.spacing(2)};
    }
  }
` as OverridableComponent<CardTypeMap>;
