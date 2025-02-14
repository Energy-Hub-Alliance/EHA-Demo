// ---------------------------------------- IMPORTS ---------------------------------------- //
import { Box, Card, Typography, useTheme } from '@mui/material';
// import { Box, Card, Fab, Typography, useTheme } from '@mui/material';
// import PlusIcon from '@mui/icons-material/Add';
// import MinusIcon from '@mui/icons-material/Remove';
import { useTranslation } from 'react-i18next';

import { HvacDetailsTemperatureTargetModel } from '../../../../../store/hvac/details/hvacDetailsModel';
import { HvacMode } from '../../../../../store/hvac/enums/hvacModeEnum';
import { hvacModesToIcons } from '../../../shared/mappers/hvacModesToIcons';
import { EMPTY_VALUE_PLACEHOLDER } from '../../../shared/components/DoubleDetailCard';

// ---------------------------------------- TYPES ---------------------------------------- //
interface DesiredTemperatureCardProps
  extends HvacDetailsTemperatureTargetModel {}

// ---------------------------------------- COMPONENT ---------------------------------------- //
export const DesiredTemperatureCard = ({
  mode,
  temperature,
}: DesiredTemperatureCardProps) => {
  const { t } = useTranslation();
  const { ui_vars } = useTheme();

  // ---------------- Logo and mode icon
  const ModeIcon = hvacModesToIcons[mode as HvacMode];

  // ---------------- Return
  if (mode === 'OFF') return;

  return (
    <Card
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2,
        }}
      >
        <ModeIcon />

        <Typography
          fontSize={ui_vars.font_size.s}
          fontWeight={400}
          lineHeight={'1.6rem'}
        >
          {t(`hvacModes.${mode}`)}
        </Typography>
      </Box>

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {/* <Fab size="small">
          <MinusIcon />
        </Fab> */}

        <Typography
          fontSize={ui_vars.font_size.xl}
          fontWeight={700}
          lineHeight={'3.2rem'}
        >
          {temperature || EMPTY_VALUE_PLACEHOLDER}
        </Typography>
        {temperature ? (
          <Typography
            component={'span'}
            fontSize={ui_vars.font_size.s}
            fontWeight={400}
            lineHeight={'1.8rem'}
            marginTop={'0.6rem'}
            pl={1}
          >
            {t(`unit.celsius`)}
          </Typography>
        ) : null}

        {/* <Fab size="small">
          <PlusIcon />
        </Fab> */}
      </Box>
    </Card>
  );
};
