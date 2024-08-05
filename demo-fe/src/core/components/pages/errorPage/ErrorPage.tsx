import { Box, Button, Typography, useTheme } from '@mui/material';
import { Header } from '../../shared/header/Header';
import ErrorMark from '../../shared/assets/unsuccessMark.svg';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

export const ErrorPage = () => {
  const { ui_vars } = useTheme();
  const [t] = useTranslation();
  const navigate = useNavigate();
  return (
    <>
      <Header />
      <Box
        sx={{
          width: '100%',
          height: `calc(100dvh - ${ui_vars.other.header_height})`,
          overflow: 'auto',
          p: ui_vars.other.page_spacing,
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            gap: 6,
            mt: `-${ui_vars.other.header_height}`,
          }}
        >
          <img src={ErrorMark} alt="Error Mark" />
          <Typography
            data-testid={`UnsuccessTitle`}
            fontWeight={700}
            fontSize={ui_vars.font_size.xl}
          >
            {t('unsuccessTitle')}
          </Typography>
          <Typography
            data-testid={`UnsuccessSubtitle`}
            fontWeight={400}
            fontSize={ui_vars.font_size.m}
          >
            {t('unsuccessSubtitle')}
          </Typography>
          <Button
            variant="contained"
            size="medium"
            fullWidth
            sx={{ mt: 3, px: 7, py: 3 }}
            onClick={() => navigate('/')}
          >
            {t('tryAgain')}
          </Button>
        </Box>
      </Box>
    </>
  );
};
