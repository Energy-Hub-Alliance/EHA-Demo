import ChargingHardwareIcon from '../assets/upcomingFeatures/chargingHardware.svg?react';
import HeatingAndCoolingIcon from '../assets/upcomingFeatures/heatingAndCooling.svg?react';
import HemsIcon from '../assets/upcomingFeatures/hems.svg?react';
import PhotovoltaicInventerIcon from '../assets/upcomingFeatures/photovoltaicInverter.svg?react';
import StorageProvidersIcon from '../assets/upcomingFeatures/storageProviders.svg?react';

export enum UpcomingFeatures {
  HEMS = 'HEMS',
  CHARGING_HARDWARE = 'CHARGING_HARDWARE',
  HEATING_AND_COOLING = 'HEATING_AND_COOLING',
  PHOTOVOLTAIC_INVERTER = 'PHOTOVOLTAIC_INVERTER',
  STORAGE_PROVIDER = 'STORAGE_PROVIDER',
}

export const upcomingFeaturesToIcons: {
  [type in UpcomingFeatures]: React.FunctionComponent<
    React.SVGProps<SVGSVGElement>
  >;
} = {
  HEMS: HemsIcon,
  CHARGING_HARDWARE: ChargingHardwareIcon,
  PHOTOVOLTAIC_INVERTER: PhotovoltaicInventerIcon,
  HEATING_AND_COOLING: HeatingAndCoolingIcon,
  STORAGE_PROVIDER: StorageProvidersIcon,
};
