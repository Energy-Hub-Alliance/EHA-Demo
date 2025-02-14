import { UnavailableHvacManufacturer } from '../../../../store/hvac/enums/UnavailableHvacManufacturer';
import BoschIcon from '../assets/hvac/manufacturers/bosch.svg?react';
import StiebelEletronIcon from '../assets/hvac/manufacturers/stiebel-eltron.svg?react';

export const unavailableHvacManufacturersToIcons: {
  [type in UnavailableHvacManufacturer]: React.FunctionComponent<
    React.SVGProps<SVGSVGElement>
  >;
} = {
  BOSCH: BoschIcon,
  STIEBELELTRON: StiebelEletronIcon,
};
