import { UnavailableChargingHardwareManufacturerEnum } from '../../../../store/charging-hardware/enums/unavailableChargingHardwareManufacturerEnum';

export const unavailableChargingHardwareManufacturersToIcons: {
  [type in UnavailableChargingHardwareManufacturerEnum]: React.FunctionComponent<
    React.SVGProps<SVGSVGElement>
  >;
} = {};
