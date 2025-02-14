import { UnavailableSmartTariffManufacturer } from '../../../../store/tariff/enums/UnavailableSmartTariffManufacturer';
import EonIcon from '../assets/smartTariff/manufacturers/eon.svg?react';
import OctopusIcon from '../assets/smartTariff/manufacturers/octopus.svg?react';

export const unavailableSmartTariffManufacturersToIcons: {
  [type in UnavailableSmartTariffManufacturer]: React.FunctionComponent<
    React.SVGProps<SVGSVGElement>
  >;
} = {
  EON: EonIcon,
  OCTOPUS: OctopusIcon,
};
