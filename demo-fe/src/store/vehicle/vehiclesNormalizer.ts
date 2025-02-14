import { VehicleDto } from './vehiclesDto';
import { VehicleModel } from './vehiclesModel';

export const vehiclesNormalizer = (vehicle: VehicleDto): VehicleModel => {
  return {
    vehicleId: vehicle.id ?? '',
    vin: vehicle.vin ?? '',
    vehicleName: vehicle.name ?? '',
    userId: vehicle.userId ?? '',
    manufacturer: vehicle.vendor ?? '',
    model: vehicle.model ?? '',
    isOnline: vehicle.isOnline,
    lastUpdated: vehicle.lastUpdated ?? '',
  };
};
