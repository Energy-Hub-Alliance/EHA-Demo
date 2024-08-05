import { VehiclesDto } from './vehiclesDto';
import { VehiclesModel } from './vehiclesModel';

export const vehiclesNormalizer = (vehicle: VehiclesDto): VehiclesModel => {
  return {
    vehicleId: vehicle.id ?? '',
    vin: vehicle.vin ?? '',
    vehicleName: vehicle.vehicleName ?? '',
    userId: vehicle.userId ?? '',
    manufacturer: vehicle.vendor ?? '',
    model: vehicle.model ?? '',
    isOnline: vehicle.isOnline,
    lastUpdated: vehicle.lastUpdated ?? '',
  };
};
