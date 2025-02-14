import { Box, ButtonBase, Card, Typography, useTheme } from '@mui/material';
import SelectedMark from '../../shared/assets/selectedMark.svg';
import { usePersistedVendorInfo } from '../../../hooks/usePersistedVendorInfo';

interface SelectableVehicleCardProps {
  vehicleId: string;
  model: string;
  manufacturer: string;
  selected: boolean;
  disabled: boolean;
  onClick: (T: string) => void;
  testId?: string;
  vin: string;
}

export const SelectableVehicleCard = ({
  vehicleId,
  model,
  manufacturer,
  onClick,
  selected,
  disabled,
  testId,
  vin,
}: SelectableVehicleCardProps) => {
  const vendorInfo = usePersistedVendorInfo(manufacturer);
  const { ui_vars } = useTheme();

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
        sx={{
          width: '100%',
          p: 4,
          position: 'relative',
          cursor: 'pointer',
        }}
      >
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          width="100%"
          gap={2}
          pb={4}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              gap: 2,
              px: 6,
              alignItems: 'center',
            }}
          >
            {vendorInfo.Icon}
            <Typography>{model}</Typography>
          </Box>

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              alignSelf: 'flex-end',
              position: 'absolute',
              right: 14,
              top: 14,
            }}
          >
            {selected ? <img src={SelectedMark} alt="Selected Mark" /> : null}
          </Box>
        </Box>
        <Typography sx={{ fontWeight: 400, fontSize: ui_vars.font_size.s }}>
          {vin}
        </Typography>
      </Card>
    </ButtonBase>
  );
};
