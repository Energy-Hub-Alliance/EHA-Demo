import { Box, ButtonBase, Card, Stack, Typography } from '@mui/material';
import SelectedMark from '../../shared/assets/selectedMark.svg';
import TariffIcon from '../../shared/assets/smartTariff/smart-tariff.svg';
import {
  SmartTarrifManufacturer,
  smartTariffManufacturersToIcons,
} from '../../shared/mappers/smartTariffManufacturersToIcons';

interface SelectableTariffCardProps {
  tariffId: string;
  tariffName?: string;
  manufacturer: SmartTarrifManufacturer;
  selected: boolean;
  disabled: boolean;
  onClick: (T: string) => void;
  testId?: string;
}

export const SelectableTariffsCard = ({
  tariffId,
  tariffName,
  manufacturer,
  onClick,
  selected,
  disabled,
  testId,
}: SelectableTariffCardProps) => {
  const Icon = smartTariffManufacturersToIcons[manufacturer];

  return (
    <ButtonBase
      disabled={disabled}
      key={tariffId}
      onClick={() => onClick(tariffId)}
      sx={{
        opacity: disabled ? 0.4 : 1,
      }}
    >
      <Card
        data-testid={`${tariffId}TariffCard${testId}`}
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
            <Stack alignItems="center" justifyContent="center" gap={2}>
              <Icon key={manufacturer} />
              {tariffName ? <Typography>{tariffName}</Typography> : null}
            </Stack>

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

          <img style={{ maxHeight: '100%' }} src={TariffIcon} />
        </Box>
      </Card>
    </ButtonBase>
  );
};
