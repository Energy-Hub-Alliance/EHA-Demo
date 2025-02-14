import { Box, ButtonBase, Card, Typography } from '@mui/material';
import SelectedMark from '../../shared/assets/selectedMark.svg';
import { usePersistedVendorInfo } from '../../../hooks/usePersistedVendorInfo';

interface SelectableChargingHardwareCardProps {
  chargerId: string;
  chargerName?: string;
  manufacturer: string;
  selected: boolean;
  disabled: boolean;
  onClick: (T: string) => void;
  testId?: string;
}

export const SelectableChargingHardwareCard = ({
  chargerId,
  chargerName,
  manufacturer,
  onClick,
  selected,
  disabled,
  testId,
}: SelectableChargingHardwareCardProps) => {
  const vendorInfo = usePersistedVendorInfo(manufacturer);

  return (
    <ButtonBase
      disabled={disabled}
      key={chargerId}
      onClick={() => onClick(chargerId)}
      sx={{
        opacity: disabled ? 0.4 : 1,
      }}
    >
      <Card
        data-testid={`${chargerId}ChargingHardware${testId}`}
        sx={{ width: '100%', p: 4, position: 'relative', cursor: 'pointer' }}
      >
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          width="100%"
          gap={2}
          pb={4}
        >
          <>{vendorInfo.Icon}</>

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

        {chargerName ? <Typography>{chargerName}</Typography> : null}
      </Card>
    </ButtonBase>
  );
};
