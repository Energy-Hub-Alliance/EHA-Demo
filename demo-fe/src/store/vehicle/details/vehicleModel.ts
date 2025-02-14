import { PowerStateEnum } from '../enums/PowerState';

// ---------------------------------------- Location ---------------------------------------- //
// interface LocationModel {
//   lastUpdatedLocation: string;
//   latitude: number;
//   longitude: number;
// }

// ---------------------------------------- Charge State ---------------------------------------- //
interface ChargeStateModel {
  // lastUpdatedChargeState: string;
  stateOfCharge: number;
  estimatedRange: number;
  chargeSpeed: number;
  chargeLimitMin: number;
  chargeLimitMax: number;
  // batteryCapacity: number;
  // chargingTimeRemaining: number;
  powerStateId: PowerStateEnum;
}

// ---------------------------------------- Climate State ---------------------------------------- //
interface ClimateStateModel {
  isClimateOn: boolean;
  isBatteryHeaterOn: boolean;
  temperatureTarget: number;
  temperatureCurrent: number;
}

// ---------------------------------------- Vehicle ---------------------------------------- //
export interface VehicleDetailModel {
  vehicleDatabaseId: string;
  //   userId: string;
  manufacturer: string;
  model: string;
  vehicleName: string;
  //   vehicleVariant: string;
  vin: string;
  odometer: number;
  //   isConnected: boolean;
  //   lastUpdated: string;
  //   location: LocationModel;
  stateOfCharge: ChargeStateModel;
  climateState: ClimateStateModel;
}
