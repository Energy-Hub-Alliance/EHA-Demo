// ---------------------------------------- Location ---------------------------------------- //
// interface LocationModel {
//   lastUpdatedLocation: string;
//   latitude: number;
//   longitude: number;
// }

// ---------------------------------------- Power State ---------------------------------------- //
export type PowerStateType =
  | 'CHARGING'
  | 'FAULT'
  | 'FINISHED'
  | 'PLUGGED'
  | 'PREPARING'
  | 'UNPLUGGED'
  | 'STOPPED'
  | 'UNKNOWN';

export enum PowerStateModel {
  CHARGING = 'CHARGING',
  FAULT = 'FAULT',
  FINISHED = 'FINISHED',
  PLUGGED = 'PLUGGED',
  PREPARING = 'PREPARING',
  UNKNOWN = 'UNKNOWN',
  UNPLUGGED = 'UNPLUGGED',
  STOPPED = 'STOPPED',
}

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
  powerStateId: PowerStateModel;
}

// ---------------------------------------- Climate State ---------------------------------------- //
interface ClimateStateModel {
  isClimateOn: boolean;
  isBatteryHeaterOn: boolean;
  temperatureTarget: number;
  temperatureCurrent: number;
}

// ---------------------------------------- Vehicle ---------------------------------------- //
export interface VehicleModel {
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
