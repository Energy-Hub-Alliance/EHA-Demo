// ---------------------------------------- IMPORTS ---------------------------------------- //
import { Box, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { PowerStateEnum } from '../../../../store/vehicle/enums/PowerState';
import { BatteryStateEnum } from '../../../../store/home-power/enums/batteryStateEnum';
import { InverterStateEnum } from '../../../../store/home-power/enums/inverterStateEnum';
import { ChargingStateEnum } from '../../../../store/charging-hardware/enums/chargingStateEnum';

// ---------------------------------------- COMPONENT ---------------------------------------- //
export const StatusChip = ({
  status,
}: {
  status:
    | PowerStateEnum
    | BatteryStateEnum
    | InverterStateEnum
    | ChargingStateEnum;
}) => {
  const { palette, ui_vars } = useTheme();
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        border: `1px solid ${palette.common.statuses[status]}`,
        borderRadius: 2,
        fontSize: ui_vars.font_size.s,
        fontWeight: 500,
        lineHeight: '2rem',
        textAlign: 'center',
        py: 1,
        px: 3,
        color: palette.common.statuses[status],
      }}
    >
      {t(`statuses.${status}`)}
    </Box>
  );
};
