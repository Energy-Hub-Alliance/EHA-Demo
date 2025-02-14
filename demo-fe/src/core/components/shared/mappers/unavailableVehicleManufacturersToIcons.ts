import { UnavailableVehicleManufacturer } from '../../../../store/vehicle/enums/UnavailableVehicleManufacturer';

export const unavailableVehicleManufacturersToIcons: {
  [type in UnavailableVehicleManufacturer]: React.FunctionComponent<
    React.SVGProps<SVGSVGElement>
  >;
} = {};
