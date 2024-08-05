import { Box, ButtonBase, Card, Typography } from '@mui/material';
import {
  Manufacturer,
  vehicleManufacturersToIcons,
} from '../../shared/mappers/vehicleManufacturersToIcons';
import VehicleHighlightedImage from '../../shared/assets/vehicle/vehicleHighlighted.png';
import SelectedMark from '../../shared/assets/selectedMark.svg';

interface SelectableVehicleCardProps {
  vehicleId: string;
  model: string;
  manufacturer: Manufacturer;
  selected: boolean;
  disabled: boolean;
  onClick: (T: string) => void;
  testId?: string;
}

export const SelectableVehicleCard = ({
  vehicleId,
  model,
  manufacturer,
  onClick,
  selected,
  disabled,
  testId,
}: SelectableVehicleCardProps) => {
  const Icon = vehicleManufacturersToIcons[manufacturer];

  return (
    <ButtonBase
      disabled={disabled}
      key={vehicleId}
      onClick={() => onClick(vehicleId)}
      sx={{
        opacity: disabled ? 0.4 : 1,
      }}
    >
      <Card
        data-testid={`${vehicleId}VehicleCard${testId}`}
        sx={{ width: '100%', p: 0, position: 'relative', cursor: 'pointer' }}
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
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            width="100%"
            gap={2}
          >
            <Icon key={manufacturer} />
            <Typography>{model}</Typography>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                alignSelf: 'flex-end',
                position: 'absolute',
                right: 7,
                top: 9,
              }}
            >
              {selected ? <img src={SelectedMark} alt="Selected Mark" /> : null}
            </Box>
          </Box>

          <img style={{ maxHeight: '100%' }} src={VehicleHighlightedImage} />
        </Box>
      </Card>
    </ButtonBase>
  );
};
