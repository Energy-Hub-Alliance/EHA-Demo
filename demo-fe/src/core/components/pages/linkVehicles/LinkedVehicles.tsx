import { useNavigate } from 'react-router-dom';
import { FooterWrapper } from '../../shared/wrappers/FooterWrapper';
import { Box, Button, Typography, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { SelectableVehicleCard } from './SelectableVehicleCard';
import { VehicleExternalModel } from '../../../../store/link/vehicleExternalModel';

interface LinkedVehiclesProps {
  vehicles: VehicleExternalModel[];
}

export const LinkedVehicles = ({ vehicles }: LinkedVehiclesProps) => {
  const navigate = useNavigate();
  const [t] = useTranslation();
  const { ui_vars } = useTheme();
  return (
    <>
      <Typography
        data-testid={`linkedVehiclesTitle`}
        fontWeight={700}
        fontSize={ui_vars.font_size.l}
        sx={{
          p: 6,
          textAlign: 'center',
        }}
      >
        {t('linkedVehicles')}
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          rowGap: 4,
          width: '100%',
          p: 4,
          pb: `calc(${ui_vars.other.footer_height} + 2rem)`,
        }}
      >
        {vehicles.map((vehicle) => {
          return (
            <SelectableVehicleCard
              key={vehicle.externalVehicleId}
              vehicleId={vehicle.externalVehicleId}
              manufacturer={vehicle.manufacturer}
              model={vehicle.vehicleName}
              selected={true}
              disabled={true}
              onClick={() => {}}
              vin={vehicle.vin}
            />
          );
        })}
      </Box>
      <FooterWrapper>
        <Button variant="contained" fullWidth onClick={() => navigate('/')}>
          {t('backToHomepage')}
        </Button>
      </FooterWrapper>
    </>
  );
};
