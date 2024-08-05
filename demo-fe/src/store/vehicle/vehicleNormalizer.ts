import { powerStateDtoToModelMap } from './powerStateNormalizer';
import { PowerStateDto, VehicleDto } from './vehicleDto';
import { PowerStateModel, VehicleModel } from './vehicleModel';

export const vehicleNormalizer = (vehicle: VehicleDto): VehicleModel => {
  return {
    vehicleDatabaseId: vehicle.id,
    // userId: vehicle.userId,
    manufacturer: vehicle.staticData.vendor ?? '',
    model: vehicle.staticData.model ?? '',
    // vehicleVariant: vehicle.vehicleVariant ?? "",
    vehicleName: vehicle.staticData.vehicleName ?? '',
    vin: vehicle.staticData.vin ?? '-',
    odometer: vehicle.odometer.odometer ?? 0,
    // isConnected: vehicle.isConnected ?? false,
    // lastUpdated: vehicle.lastUpdated ?? "",
    // location: {
    //   lastUpdatedLocation: vehicle.location.lastUpdatedLocation ?? '',
    //   latitude: vehicle.location.latitude ?? 0,
    //   longitude: vehicle.location.longitude ?? 0,
    // },
    stateOfCharge: {
      // lastUpdatedChargeState: vehicle.chargeState?.lastUpdated ?? "",
      stateOfCharge: vehicle.chargeState?.stateOfCharge ?? 0,
      estimatedRange: vehicle.chargeState?.estimatedRange ?? 0,
      chargeSpeed: vehicle.chargeState?.chargeRate ?? 0,
      chargeLimitMin: vehicle.chargeState?.chargeLimitMin ?? 0,
      chargeLimitMax: vehicle.chargeState?.chargeLimitMax ?? 0,
      // chargingTimeRemaining: vehicle.chargeState?.chargingTimeRemaining ?? 0,
      powerStateId: vehicle.chargeState?.chargingState
        ? powerStateDtoToModelMap[
            vehicle.chargeState.chargingState.toUpperCase() as PowerStateDto
          ]
        : PowerStateModel.UNKNOWN,
    },
    climateState: {
      isClimateOn: vehicle.climateState?.isClimateOn ?? false,
      isBatteryHeaterOn: vehicle.climateState?.isBatteryHeaterOn ?? false,
      temperatureTarget: vehicle.climateState?.temperatureTarget ?? 0,
      temperatureCurrent: vehicle.climateState?.temperatureCurrent ?? 0,
    },
  };
};
