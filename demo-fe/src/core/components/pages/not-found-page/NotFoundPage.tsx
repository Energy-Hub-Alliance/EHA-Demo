import { Box, Button, Typography, useTheme } from '@mui/material';
import { Header } from '../../shared/header/Header';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

export const NotFoundPage = () => {
  const { palette, ui_vars } = useTheme();
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
          <Typography
            fontWeight={700}
            fontSize={'10rem'}
            lineHeight={1}
            color={palette.secondary.main}
          >
            404
          </Typography>

          <Typography
            data-testid={`notFoundTitle`}
            fontWeight={700}
            fontSize={ui_vars.font_size.xl}
          >
            {t('notFoundTitle')}
          </Typography>
          <Typography
            data-testid={`notFoundSubtitle`}
            fontWeight={400}
            fontSize={ui_vars.font_size.m}
          >
            {t('notFoundSubtitle')}
          </Typography>
          <Button
            variant="contained"
            size="medium"
            fullWidth
            sx={{ mt: 3, px: 7, py: 3 }}
            onClick={() => navigate('/')}
          >
            {t('goHome')}
          </Button>
        </Box>
      </Box>
    </>
  );
};
