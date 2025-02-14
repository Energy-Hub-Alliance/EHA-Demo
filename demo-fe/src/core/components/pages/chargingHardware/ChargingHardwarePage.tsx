import { Box, Button, Typography, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { FooterWrapper } from '../../shared/wrappers/FooterWrapper';
import { Header } from '../../shared/header/Header';
import { useGetChargersQuery } from '../../../../store/charging-hardware/chargingHardwareApi';
import { SingleChargingHardwareCard } from './SingleChargingHardwareCard';
import { Loader } from '../../shared/loader/Loader';

export const ChargingHardwarePage = () => {
  const { ui_vars } = useTheme();
  const [t] = useTranslation();
  const navigate = useNavigate();
  const { data: chargers, isLoading } = useGetChargersQuery();

  if (isLoading) return <Loader />;
  return (
    <>
      <Header />
      <Typography
        data-testid={`chargingHardwareTitle`}
        fontWeight={700}
        fontSize={ui_vars.font_size.l}
        sx={{
          p: 6,
          textAlign: 'center',
        }}
      >
        {t('chargingHardware')}
      </Typography>
      {chargers?.chargers && chargers?.chargers.length > 0 ? (
        <Box
          sx={{
            px: 5,
            display: 'flex',
            flexDirection: 'column',
            rowGap: 5,
            pb: `calc(${ui_vars.other.footer_height} + 2rem)`,
          }}
        >
          {chargers.chargers.map((charger) => (
            <SingleChargingHardwareCard
              key={charger.chargerId}
              chargerId={charger.chargerId}
              chargerVendor={charger.vendor}
              chargerName={charger.chargerName}
            />
          ))}
        </Box>
      ) : (
        <Typography
          data-testid={`chargingHardwareSubtitle`}
          fontWeight={400}
          fontSize={ui_vars.font_size.m}
          sx={{
            p: 6,
            textAlign: 'center',
          }}
        >
          {t('noConnectedChargingHardware')}
        </Typography>
      )}

      <FooterWrapper>
        <Button
          variant="contained"
          fullWidth
          onClick={() => navigate('connect')}
        >
          {t('connectChargingHardware')}
        </Button>
      </FooterWrapper>
    </>
  );
};
