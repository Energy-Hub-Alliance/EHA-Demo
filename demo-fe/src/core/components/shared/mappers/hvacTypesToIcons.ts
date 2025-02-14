import ACIcon from '../assets/hvac/type/ac.svg?react';
import DHWIcon from '../assets/hvac/type/dhw.svg?react';
import ThermostatIcon from '../assets/hvac/type/thermostat.svg?react';
import HeatpumpIcon from '../assets/hvac/type/heatpump.svg?react';
import { HvacType } from '../../../../store/hvac/enums/hvacTypeEnum';

export const hvacTypesToIcons: {
  [type in HvacType]: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
} = {
  AC: ACIcon,
  HEATPUMP: HeatpumpIcon,
  DHW: DHWIcon,
  THERMOSTAT: ThermostatIcon,
};
