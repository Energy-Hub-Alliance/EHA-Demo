import { Box, Typography, useTheme } from '@mui/material';
import { Header } from '../../shared/header/Header';
import { UpcomingFeaturesList } from '../../shared/components/UpcomingFeaturesList';
import { useTranslation } from 'react-i18next';
import { EnergyPlayer } from './EnergyPlayer';
import { useNavigate } from 'react-router-dom';
import VehicleHighlightedImage from '../../shared/assets/vehicle/vehicleHighlighted.png';
import SmartTariffImage from '../../shared/assets/smartTariff/smart-tariff.svg?react';
import HvacImage from '../../shared/assets/hvac/hvac.svg?react';
import SolarInvAndBatteriesImage from '../../shared/assets/homePower/solarAndbattery.svg?react';
import ChargingHardwareImage from '../../shared/assets/chargingHardware/chargingHardware.svg?react';

export const LandingPage = () => {
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
          overflowX: 'auto',
          p: ui_vars.other.page_spacing,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography
          data-testid={`Title`}
          fontWeight={700}
          fontSize={ui_vars.font_size.l}
          sx={{
            p: 6,
            pb: 0,
            textAlign: 'center',
          }}
        >
          {t('landingPageTitle')}
        </Typography>
        <Typography
          data-testid={`VehiclesSubtitle`}
          fontWeight={400}
          fontSize={ui_vars.font_size.m}
          sx={{
            p: 6,
            textAlign: 'center',
          }}
        >
          {t('vehiclesSubtitle')}
        </Typography>
        <EnergyPlayer
          title={t('vehicles')}
          onClick={() => navigate('/vehicles')}
          Icon={VehicleHighlightedImage}
          testId="vehicles"
        />
        <Typography
          data-testid={`SmartTariffsSubtitle`}
          fontWeight={400}
          fontSize={ui_vars.font_size.m}
          sx={{
            p: 6,
            textAlign: 'center',
          }}
        >
          {t('smartTariffsSubtitle')}
        </Typography>
        <EnergyPlayer
          title={t('smartTariffs')}
          onClick={() => navigate('/smart-tariffs')}
          Icon={SmartTariffImage}
          testId="smart-tariffs"
        />
        <Typography
          data-testid={`HvacSubtitle`}
          fontWeight={400}
          fontSize={ui_vars.font_size.m}
          sx={{
            p: 6,
            textAlign: 'center',
          }}
        >
          {t('hvacSubtitle')}
        </Typography>
        <EnergyPlayer
          title={t('hvacs')}
          onClick={() => navigate('/hvacs')}
          Icon={HvacImage}
          testId="hvacs"
        />
        <Typography
          data-testid={`homePowerSubtitle`}
          fontWeight={400}
          fontSize={ui_vars.font_size.m}
          sx={{
            p: 6,
            textAlign: 'center',
          }}
        >
          {t('homePowerSubtitle')}
        </Typography>
        <EnergyPlayer
          title={t('homePower')}
          onClick={() => navigate('/home-power')}
          Icon={SolarInvAndBatteriesImage}
          testId="homePower"
        />
        <Typography
          data-testid={`chargingHardware`}
          fontWeight={400}
          fontSize={ui_vars.font_size.m}
          sx={{
            p: 6,
            textAlign: 'center',
          }}
        >
          {t('chargingHardwareSubtitle')}
        </Typography>
        <EnergyPlayer
          title={t('chargingHardware')}
          onClick={() => navigate('/charging-hardware')}
          Icon={ChargingHardwareImage}
          testId="chargingHardware"
        />
        <UpcomingFeaturesList />
      </Box>
    </>
  );
};
