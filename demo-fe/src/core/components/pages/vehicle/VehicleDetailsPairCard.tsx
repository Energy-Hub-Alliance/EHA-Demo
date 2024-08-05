// ---------------------------------------- IMPORTS ---------------------------------------- //
import { Box, Card, Typography, useTheme } from '@mui/material';

import BatteryHeaterIcon from '../../shared/assets/vehicle/details/battery-heater.svg?react';
import ChargingSpeedIcon from '../../shared/assets/vehicle/details/charging-speed.svg?react';
import CurrentTemperatureIcon from '../../shared/assets/vehicle/details/current-temperature.svg?react';
import EstimatedRangeIcon from '../../shared/assets/vehicle/details/estimated-range.svg?react';
import HeatingCoolingIcon from '../../shared/assets/vehicle/details/heating-cooling.svg?react';
import TargetTemperatureIcon from '../../shared/assets/vehicle/details/target-temperature.svg?react';
import { useTranslation } from 'react-i18next';

// ---------------------------------------- CONSTANTS ---------------------------------------- //
enum VehicleDetail {
  BATTERY_HEATER = 'BATTERY_HEATER',
  CHARGING_SPEED = 'CHARGING_SPEED',
  CURRENT_TEMPERATURE = 'CURRENT_TEMPERATURE',
  ESTIMATED_RANGE = 'ESTIMATED_RANGE',
  HEATING_COOLING = 'HEATING_COOLING',
  TARGET_TEMPERATURE = 'TARGET_TEMPERATURE',
}

// ---------------------------------------- TYPES & INTERFACES ---------------------------------------- //

type VehicleDetailType = keyof typeof VehicleDetail;

interface VehicleDetailBoxProp {
  vehicleDetail: VehicleDetailType;
  detailValue: string | number | boolean;
}

// ---------------------------------------- UTILITY ---------------------------------------- //
const vehicleDetailsToIconsAndUnits: {
  [type in VehicleDetail]: {
    icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
    unit: string;
  };
} = {
  BATTERY_HEATER: {
    icon: BatteryHeaterIcon,
    unit: '',
  },
  CHARGING_SPEED: {
    icon: ChargingSpeedIcon,
    unit: 'kW',
  },
  CURRENT_TEMPERATURE: {
    icon: CurrentTemperatureIcon,
    unit: '°C',
  },
  ESTIMATED_RANGE: {
    icon: EstimatedRangeIcon,
    unit: 'km',
  },
  HEATING_COOLING: {
    icon: HeatingCoolingIcon,
    unit: '',
  },
  TARGET_TEMPERATURE: {
    icon: TargetTemperatureIcon,
    unit: '°C',
  },
};

// ---------------------------------------- HELPER COMPONENT ---------------------------------------- //
const VehicleDetailBox = ({
  vehicleDetail,
  detailValue,
}: VehicleDetailBoxProp) => {
  const { ui_vars } = useTheme();
  const { t } = useTranslation();
  const { icon, unit } = vehicleDetailsToIconsAndUnits[vehicleDetail];
  const DetailIcon = icon;

  return (
    <Box width={'45%'}>
      <Typography
        textTransform={'uppercase'}
        fontSize={ui_vars.font_size.xs}
        fontWeight={500}
        lineHeight={'1.8rem'}
      >
        {t(`details.${vehicleDetail}`)}
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <DetailIcon />
        <Typography
          fontSize={ui_vars.font_size.l}
          fontWeight={700}
          lineHeight={'3.2rem'}
        >
          {`${
            typeof detailValue === 'boolean'
              ? t(`detailsBoolean.${detailValue}Value`)
              : detailValue
          }${unit}`}
        </Typography>
      </Box>
    </Box>
  );
};

// ---------------------------------------- MAIN COMPONENT ---------------------------------------- //
export const VehicleDetailsPairCard = ({
  firstDetail,
  secondDetail,
}: {
  firstDetail: VehicleDetailBoxProp;
  secondDetail: VehicleDetailBoxProp;
}) => {
  const { palette } = useTheme();

  return (
    <Card
      sx={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        gap: 4,
      }}
    >
      <VehicleDetailBox
        vehicleDetail={firstDetail.vehicleDetail}
        detailValue={firstDetail.detailValue}
      />

      <Box
        sx={{
          width: '10%',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Box
          sx={{
            width: '1px',
            height: '3.6rem',
            background: palette.common.vertical_separator,
          }}
        ></Box>
      </Box>

      <VehicleDetailBox
        vehicleDetail={secondDetail.vehicleDetail}
        detailValue={secondDetail.detailValue}
      />
    </Card>
  );
};
