// ---------------------------------------- IMPORTS ---------------------------------------- //
import { Box, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { PowerStateType } from '../../../../store/vehicle/vehicleModel';

// ---------------------------------------- COMPONENT ---------------------------------------- //
export const StatusChip = ({ status }: { status: PowerStateType }) => {
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
