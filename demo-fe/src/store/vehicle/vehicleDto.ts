// ---------------------------------------- Location ---------------------------------------- //
interface LocationDto {
  lastUpdatedLocation: string;
  latitude: number;
  longitude: number;
}

// ---------------------------------------- Power State ---------------------------------------- //
export enum PowerStateDto {
  CHARGING = 'CHARGING',
  FAULT = 'FAULT',
  FINISHED = 'FINISHED',
  PLUGGED = 'PLUGGED',
  PREPARING = 'PREPARING',
  UNKNOWN = 'UNKNOWN',
  UNPLUGGED = 'UNPLUGGED',
  STOPPED = 'STOPPED',
}

export enum EngineTypeDto {
  BEV = 'BEV', // Battery Electric Vehicle. Can charge
  HEV = 'HEV', // Hybrid Electric Vehicle. Can not charge
  PHEV = 'PHEV', // Plug-in Hybrid Electric Vehicle. Can charge
  ICEV = 'ICEV', // Internal Combustion Engine Vehicle. Can not charge
}

// ---------------------------------------- Charge State ---------------------------------------- //
interface ChargeStateDto {
  chargeLimitMax: number;
  chargeLimitMin: number;
  chargeRate: number;
  chargingState: PowerStateDto;
  chargingTimeRemaining: number;
  estimatedRange: number;
  lastUpdated: string;
  stateOfCharge: number;
  scheduledChargingStartTime: string;
  scheduledDepartureTime: string;
}

// ---------------------------------------- Climate State ---------------------------------------- //
interface ClimateStateDto {
  isBatteryHeaterOn: boolean;
  isClimateOn: boolean;
  lastUpdated: string;
  temperatureCurrent: number;
  temperatureTarget: number;
}

interface OdometerDto {
  lastUpdated: string;
  odometer: number;
}

interface StaticDataDto {
  batteryCapacity: number;
  engineType: EngineTypeDto;
  lastUpdated: string;
  model: string;
  vehicleName: string;
  vehicleVariant: string;
  vendor: string;
  vin: string;
}

// ---------------------------------------- Vehicle ---------------------------------------- //
export interface VehicleDto {
  chargeState: ChargeStateDto;
  climateState: ClimateStateDto;
  id: string;
  isOnline: boolean;
  lastUpdated: string;
  location: LocationDto;
  odometer: OdometerDto;
  staticData: StaticDataDto;
  userId: string;
}
