import { Box, Button, Typography, useTheme } from '@mui/material';
import { Header } from '../../shared/header/Header';
import SuccessMark from '../../shared/assets/successMark.svg';
import { useTranslation } from 'react-i18next';

interface SuccessPageProps {
  title: string;
  subtitle: string;
  onContinue: () => void;
}

export const SuccessPage = ({
  title,
  subtitle,
  onContinue,
}: SuccessPageProps) => {
  const { ui_vars } = useTheme();
  const [t] = useTranslation();

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
          <img src={SuccessMark} alt="Success Mark" />
          <Typography
            data-testid={`SuccessTitle`}
            fontWeight={700}
            fontSize={ui_vars.font_size.xl}
          >
            {title}
          </Typography>
          <Typography
            data-testid={`SuccessSubtitle`}
            fontWeight={400}
            fontSize={ui_vars.font_size.m}
          >
            {subtitle}
          </Typography>
          <Button
            variant="contained"
            size="medium"
            fullWidth
            sx={{ mt: 3, px: 7, py: 3 }}
            onClick={onContinue}
          >
            {t('continueMessage')}
          </Button>
        </Box>
      </Box>
    </>
  );
};
