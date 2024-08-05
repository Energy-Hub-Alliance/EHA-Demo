import TeslaIcon from '../assets/vehicle/manufacturers/tesla.svg?react';
import MercedesIcon from '../assets/vehicle/manufacturers/mercedes.svg?react';
import BmwIcon from '../assets/vehicle/manufacturers/bmw.svg?react';
import VolkswagenIcon from '../assets/vehicle/manufacturers/volkswagen.svg?react';
import AudiIcon from '../assets/vehicle/manufacturers/audi.svg?react';
import MiniIcon from '../assets/vehicle/manufacturers/mini.svg?react';

export enum Manufacturer {
  MERCEDES = 'MERCEDES',
  TESLA = 'TESLA',
  BMW = 'BMW',
  AUDI = 'AUDI',
  VOLKSWAGEN = 'VOLKSWAGEN',
  MINI = 'MINI',
}

export const vehicleManufacturersToIcons: {
  [type in Manufacturer]: React.FunctionComponent<
    React.SVGProps<SVGSVGElement>
  >;
} = {
  TESLA: TeslaIcon,
  MERCEDES: MercedesIcon,
  BMW: BmwIcon,
  VOLKSWAGEN: VolkswagenIcon,
  AUDI: AudiIcon,
  MINI: MiniIcon,
};
