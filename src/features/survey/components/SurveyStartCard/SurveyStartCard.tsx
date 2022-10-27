import { useSurveyResultsStore } from '@features/survey/hooks';
import {
  Backdrop,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Fade,
  Modal,
  styled,
  Typography,
} from '@mui/material';
import { MouseEventHandler, useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SurveyCard } from '../SurveyCard';
import { useCurrentUserProfile } from '@features/users/hooks/useCurrentUserProfile';

const StyledModalCard = styled(Card)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 500px;
  width: 100%;
`;

export const SurveyStartCard = () => {
  const navigate = useNavigate();
  const setSurveyState = useSurveyResultsStore((state) => state.setSurveyState);
  const [confirmSurveyRepeatModalOpen, setConfirmSurveyRepeatModalOpen] = useState(false);
  const { profile } = useCurrentUserProfile();
  const [isSurveyRepeatConfirmed, setIsSurveyRepeatConfirmed] = useSurveyResultsStore(
    (state) => [state.isSurveyRepeatConfirmed, state.setSurveyRepeatConfirmed],
  );
  console.log(profile?.professionId);

  const alreadyHasRecommendations = profile?.professionId && !isSurveyRepeatConfirmed;

  useEffect(() => {
    if (alreadyHasRecommendations) {
      setConfirmSurveyRepeatModalOpen(true);
    }
  }, [alreadyHasRecommendations]);

  const handleStartSurvey: MouseEventHandler<HTMLButtonElement> = (e) => {
    setSurveyState('in-progress');
    navigate('/survey/step/1');

    e.preventDefault();
  };

  const handleModalAcceptance = useCallback(() => {
    setIsSurveyRepeatConfirmed(true);
    setConfirmSurveyRepeatModalOpen(false);
  }, [navigate, setSurveyState]);

  return (
    <>
      <SurveyCard component="section">
        <Box component="header" p={3}>
          <Typography variant="h3" component="h1">
            Пройти тест <br />и подобрать IT профессию
          </Typography>
        </Box>
        <CardContent style={{ paddingTop: 0 }}>
          <Typography variant="body1" component="p" style={{ maxWidth: 400 }}>
            Ответьте на 10 вопросов и узнайте наиболее подходящее для вас IT направление
          </Typography>
        </CardContent>
        <CardActions style={{ marginTop: 20 }} sx={{ p: 2 }}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            fullWidth
            sx={{ py: 2 }}
            onClick={handleStartSurvey}
          >
            Начать тестирование
          </Button>
        </CardActions>
      </SurveyCard>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={confirmSurveyRepeatModalOpen}
        onClose={() => handleModalAcceptance()}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={confirmSurveyRepeatModalOpen}>
          <StyledModalCard>
            <CardHeader title="Вы уже проходили тестирование" sx={{ pb: 0 }} />
            <CardContent>
              <Typography id="transition-modal-description" sx={{ mt: 0 }}>
                Вы уже проходили тестирование и получили рекомендации по профессиям.
                Повторное прохождение теста приведет к удалению предыдущих и cозданию
                новых рекомендаций. <br />
                <br />
                Продолжить?
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                variant="text"
                color="primary"
                size="large"
                fullWidth
                sx={{ py: 2 }}
                onClick={() => navigate(-1)}
              >
                Назад
              </Button>
              <Button
                variant="text"
                color="primary"
                size="large"
                fullWidth
                sx={{ py: 2 }}
                onClick={handleModalAcceptance}
              >
                Продолжить
              </Button>
            </CardActions>
          </StyledModalCard>
        </Fade>
      </Modal>
    </>
  );
};
