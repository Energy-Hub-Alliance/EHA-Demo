import { HvacMode } from '../../../../store/hvac/enums/hvacModeEnum';

import AutoIcon from '../assets/hvac/details/mode_auto.svg?react';
import CoolIcon from '../assets/hvac/details/mode_cool.svg?react';
import DryIcon from '../assets/hvac/details/mode_dry.svg?react';
import HeatIcon from '../assets/hvac/details/mode_heat.svg?react';
import OffIcon from '../assets/hvac/details/mode_off.svg?react';
import ReducedIcon from '../assets/hvac/details/mode_reduced.svg?react';

export const hvacModesToIcons: {
  [type in HvacMode]: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
} = {
  AUTO: AutoIcon,
  COOL: CoolIcon,
  DRY: DryIcon,
  HEAT: HeatIcon,
  OFF: OffIcon,
  REDUCED: ReducedIcon,
};
