import { PowerStateEnum } from '../enums/PowerState';
import { VehicleDetailDto } from './vehicleDto';
import { VehicleDetailModel } from './vehicleModel';

export const vehicleDetailNormalizer = (
  vehicle: VehicleDetailDto
): VehicleDetailModel => {
  return {
    vehicleDatabaseId: vehicle.id,
    // userId: vehicle.userId,
    manufacturer: vehicle.staticData.vendor ?? '',
    model: vehicle.staticData.model ?? '',
    // vehicleVariant: vehicle.vehicleVariant ?? "",
    vehicleName: vehicle.staticData.name ?? '',
    vin: vehicle.staticData.vin ?? '-',
    odometer: vehicle.odometer.odometer ?? null,
    // isConnected: vehicle.isConnected ?? false,
    // lastUpdated: vehicle.lastUpdated ?? "",
    // location: {
    //   lastUpdatedLocation: vehicle.location.lastUpdatedLocation ?? '',
    //   latitude: vehicle.location.latitude ?? null,
    //   longitude: vehicle.location.longitude ?? null,
    // },
    stateOfCharge: {
      // lastUpdatedChargeState: vehicle.chargeState?.lastUpdated ?? "",
      stateOfCharge: vehicle.chargeState?.stateOfCharge ?? null,
      estimatedRange: vehicle.chargeState?.estimatedRange ?? null,
      chargeSpeed: vehicle.chargeState?.chargeRate ?? null,
      chargeLimitMin: vehicle.chargeState?.chargeLimitMin ?? null,
      chargeLimitMax: vehicle.chargeState?.chargeLimitMax ?? null,
      // chargingTimeRemaining: vehicle.chargeState?.chargingTimeRemaining ?? null,
      powerStateId: vehicle.chargeState?.chargingState
        ? (vehicle.chargeState.chargingState.toUpperCase() as PowerStateEnum)
        : PowerStateEnum.UNKNOWN,
    },
    climateState: {
      isClimateOn: vehicle.climateState?.isClimateOn ?? false,
      isBatteryHeaterOn: vehicle.climateState?.isBatteryHeaterOn ?? false,
      temperatureTarget: vehicle.climateState?.temperatureTarget ?? null,
      temperatureCurrent: vehicle.climateState?.temperatureCurrent ?? null,
    },
  };
};
