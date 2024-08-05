import { Box, Card, Typography, useTheme } from '@mui/material';
import EastIcon from '@mui/icons-material/East';
import {
  Manufacturer,
  vehicleManufacturersToIcons,
} from '../../shared/mappers/vehicleManufacturersToIcons';
import { useNavigate } from 'react-router-dom';
import { useGetVehicleImageQuery } from '../../../../store/vehicle/vehicleApi';
import VehicleHighlightedImage from '../../shared/assets/vehicle/vehicleHighlighted.png';

interface SingleVehicleCardProps {
  vehicleId: string;
  vehicleModel: string;
  manufacturer: Manufacturer;
}

export const SingleVehicleCard = ({
  vehicleId,
  vehicleModel,
  manufacturer,
}: SingleVehicleCardProps) => {
  const navigate = useNavigate();
  const { palette } = useTheme();
  const { data: vehicleImage } = useGetVehicleImageQuery(vehicleId || '', {
    skip: vehicleId === '',
  });
  const ManufacturerIcon = vehicleManufacturersToIcons[manufacturer];

  return (
    <Card
      key={vehicleId}
      onClick={() => navigate(`/vehicles/${vehicleId}`)}
      sx={{
        width: '100%',
        p: 0,
        display: 'flex',
        flexDirection: 'column',
        cursor: 'pointer',
      }}
    >
      <Box
        sx={{
          minHeight: '18rem',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 3,
          p: 2,
        }}
      >
        <Box display={'flex'} flexDirection="row" alignItems="center" gap={2}>
          <ManufacturerIcon key={manufacturer} />
          <Typography>{vehicleModel}</Typography>
        </Box>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            width: 'calc(100% - 16px)',
            height: '150px',
            borderRadius: 2,
          }}
        >
          {vehicleImage ? (
            <img src={vehicleImage} alt="vehicle" height={250} />
          ) : (
            <img
              src={VehicleHighlightedImage}
              alt="vehicle"
              style={{ maxHeight: '100%' }}
            />
          )}
        </Box>
      </Box>

      <Box
        sx={{
          backgroundColor: palette.primary.main,
          borderRadius: '12px 0 6px 0',
          width: 48,
          height: 30,
          display: 'flex',
          alignItems: 'center',
          alignSelf: 'flex-end',
        }}
      >
        <EastIcon
          fontSize="small"
          sx={{
            display: 'block',
            margin: '0 auto',
          }}
        />
      </Box>
    </Card>
  );
};
