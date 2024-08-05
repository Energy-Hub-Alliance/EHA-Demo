import EonIcon from '../assets/smartTariff/manufacturers/eon.svg?react';
import OctopusIcon from '../assets/smartTariff/manufacturers/octopus.svg?react';
import OstromIcon from '../assets/smartTariff/manufacturers/ostrom.svg?react';
import TibberIcon from '../assets/smartTariff/manufacturers/tibber.svg?react';

export enum SmartTarrifManufacturer {
  EON = 'EON',
  OCTOPUS = 'OCTOPUS',
  OSTROM = 'OSTROM',
  TIBBER = 'TIBBER',
}

export const smartTariffManufacturersToIcons: {
  [type in SmartTarrifManufacturer]: React.FunctionComponent<
    React.SVGProps<SVGSVGElement>
  >;
} = {
  EON: EonIcon,
  OCTOPUS: OctopusIcon,
  OSTROM: OstromIcon,
  TIBBER: TibberIcon,
};
