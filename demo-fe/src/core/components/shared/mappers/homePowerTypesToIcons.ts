import SolarIcon from '../assets/homePower/type/solar.svg?react';
import BatteryIcon from '../assets/homePower/type/battery.svg?react';
import MeterIcon from '../assets/homePower/meters/meterType.svg?react';
import { HomePowerType } from '../../../../store/home-power/enums/homePowerTypeEnum';

export const homePowerTypesToIcons: {
  [type in HomePowerType]: React.FunctionComponent<
    React.SVGProps<SVGSVGElement>
  >;
} = {
  PV_INVERTER: SolarIcon,
  BATTERY: BatteryIcon,
  METER: MeterIcon,
};
