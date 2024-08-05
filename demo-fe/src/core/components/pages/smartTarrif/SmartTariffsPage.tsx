import { Box, Button, Typography, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { FooterWrapper } from '../../shared/wrappers/FooterWrapper';
import { Header } from '../../shared/header/Header';
import { useGetTariffsQuery } from '../../../../store/tariff/tariffApi';
import { Loader } from '../../shared/loader/Loader';
import { SingleSmartTariffCard } from './SingleSmartTariffCard';

export const SmartTariffsPage = () => {
  const { ui_vars } = useTheme();
  const [t] = useTranslation();
  const navigate = useNavigate();
  const { data: smartTariffs, isLoading } = useGetTariffsQuery();

  if (isLoading) return <Loader />;

  return (
    <>
      <Header />
      <Typography
        data-testid={`smartTariffTitle`}
        fontWeight={700}
        fontSize={ui_vars.font_size.l}
        sx={{
          p: 6,
          textAlign: 'center',
        }}
      >
        {t('smartTariffs')}
      </Typography>

      {smartTariffs?.tariffs && smartTariffs?.tariffs.length > 0 ? (
        <Box
          sx={{
            px: 5,
            display: 'flex',
            flexDirection: 'column',
            rowGap: 5,
            pb: `calc(${ui_vars.other.footer_height} + 2rem)`,
          }}
        >
          {smartTariffs.tariffs.map((tariff) => (
            <SingleSmartTariffCard
              key={tariff.tariffId}
              smartTariffId={tariff.tariffId}
              smartTariffVendor={tariff.vendor}
            />
          ))}
        </Box>
      ) : (
        <Typography
          data-testid={`smartTariffSubtitle`}
          fontWeight={400}
          fontSize={ui_vars.font_size.m}
          sx={{
            p: 6,
            textAlign: 'center',
          }}
        >
          {t('noConnectedSmartTariffs')}
        </Typography>
      )}

      <FooterWrapper>
        <Box
          sx={{
            height: '100%',
            width: '100%',
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'center',
            px: 10,
          }}
        >
          <Button
            variant="contained"
            fullWidth
            onClick={() => navigate('connect')}
          >
            {t('connectSmartTariff')}
          </Button>
        </Box>
      </FooterWrapper>
    </>
  );
};
