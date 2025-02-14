import { UnavailableHomePowerManufacturer } from '../../../../store/home-power/enums/UnavailableHomePowerManufacturer';
import EnphaseIcon from '../assets/homePower/manufacturers/enphase.svg?react';

export const unavailableHomePowerManufacturersToIcons: {
  [type in UnavailableHomePowerManufacturer]: React.FunctionComponent<
    React.SVGProps<SVGSVGElement>
  >;
} = {
  ENPHASE: EnphaseIcon,
};
