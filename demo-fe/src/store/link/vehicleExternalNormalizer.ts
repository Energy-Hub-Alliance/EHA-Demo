import { VehicleExternalDto } from './vehicleExternalDto';
import { VehicleExternalModel } from './vehicleExternalModel';

export const vehicleExternalNormalizer = (
  vehicleExternal: VehicleExternalDto
): VehicleExternalModel => {
  return {
    externalVehicleId: vehicleExternal.externalId ?? '',
    vin: vehicleExternal.vin ?? '',
    vehicleName: vehicleExternal.vehicleName ?? '',
    manufacturer: vehicleExternal.vendor ?? '',
    linked: vehicleExternal.isLinked ?? '',
  };
};
