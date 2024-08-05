import { Box, Button, Typography, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Manufacturer } from '../../shared/mappers/vehicleManufacturersToIcons';
import { SingleVehicleCard } from './SingleVehicleCard';
import { useGetVehiclesQuery } from '../../../../store/vehicle/vehicleApi';
import { useMemo } from 'react';
import { Loader } from '../../shared/loader/Loader';
import { FooterWrapper } from '../../shared/wrappers/FooterWrapper';
import { Header } from '../../shared/header/Header';

export const VehiclesPage = () => {
  const { ui_vars } = useTheme();
  const [t] = useTranslation();
  const navigate = useNavigate();

  const { data: vehicles, isLoading } = useGetVehiclesQuery();

  const receivedVehicles = useMemo(() => {
    return vehicles?.vehicles.map((vehicle) => {
      return {
        id: vehicle.vehicleId,
        model: vehicle.vehicleName || vehicle.model || '',
        manufacturer: vehicle.manufacturer as Manufacturer,
      };
    });
  }, [vehicles?.vehicles]);

  if (isLoading) return <Loader />;

  return (
    <>
      <Header />
      <Typography
        data-testid={`vehiclesTitle`}
        fontWeight={700}
        fontSize={ui_vars.font_size.l}
        sx={{
          p: 6,
          textAlign: 'center',
        }}
      >
        {t('vehicles')}
      </Typography>

      {receivedVehicles && receivedVehicles.length > 0 ? (
        <Box
          sx={{
            px: 5,
            display: 'flex',
            flexDirection: 'column',
            rowGap: 5,
            pb: `calc(${ui_vars.other.footer_height} + 2rem)`,
          }}
        >
          {receivedVehicles.map((vehicle) => (
            <SingleVehicleCard
              key={vehicle.id}
              vehicleId={vehicle.id}
              vehicleModel={vehicle.model}
              manufacturer={vehicle.manufacturer}
            />
          ))}
        </Box>
      ) : (
        <Typography
          data-testid={`vehiclesSubtitle`}
          fontWeight={400}
          fontSize={ui_vars.font_size.m}
          sx={{
            p: 6,
            textAlign: 'center',
          }}
        >
          {t('noConnectedVehicles')}
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
            {t('connectVehicles')}
          </Button>
        </Box>
      </FooterWrapper>
    </>
  );
};
