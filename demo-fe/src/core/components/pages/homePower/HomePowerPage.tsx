import { Box, Button, Typography, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { FooterWrapper } from '../../shared/wrappers/FooterWrapper';
import { Header } from '../../shared/header/Header';
import { SingleHomePowerCard } from './SingleHomePowerCard';
import { useHomePowerMerged } from '../../../../store/home-power/useHomePowerMerged';
import { Loader } from '../../shared/loader/Loader';

export const HomePowerPage = () => {
  const { ui_vars } = useTheme();
  const [t] = useTranslation();
  const navigate = useNavigate();

  const { data: receivedHomePower, isLoading } = useHomePowerMerged();

  if (isLoading) return <Loader />;

  return (
    <>
      <Header />
      <Typography
        data-testid={`homePowerTitle`}
        fontWeight={700}
        fontSize={ui_vars.font_size.l}
        sx={{
          p: 6,
          textAlign: 'center',
        }}
      >
        {t('homePower')}
      </Typography>

      {receivedHomePower && receivedHomePower.length > 0 ? (
        <Box
          sx={{
            px: 5,
            display: 'flex',
            flexDirection: 'column',
            rowGap: 5,
            pb: `calc(${ui_vars.other.footer_height} + 2rem)`,
          }}
        >
          {receivedHomePower.map((homePower) => (
            <SingleHomePowerCard
              key={homePower.id}
              homePowerId={homePower.id}
              homePowerModel={homePower.name || homePower.model || ''}
              manufacturer={homePower.manufacturer}
              type={homePower.type}
            />
          ))}
        </Box>
      ) : (
        <Typography
          data-testid={`homePowerSubtitle`}
          fontWeight={400}
          fontSize={ui_vars.font_size.m}
          sx={{
            p: 6,
            textAlign: 'center',
          }}
        >
          {t('noConnectedHomePower')}
        </Typography>
      )}

      <FooterWrapper>
        <Button
          variant="contained"
          fullWidth
          onClick={() => navigate('connect')}
        >
          {t('connectHomePower')}
        </Button>
      </FooterWrapper>
    </>
  );
};
