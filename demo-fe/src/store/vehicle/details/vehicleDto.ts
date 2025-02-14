import { EngineTypeEnum } from '../enums/EnergyType';
import { PowerStateEnum } from '../enums/PowerState';

// ---------------------------------------- Location ---------------------------------------- //
interface LocationDto {
  lastUpdatedLocation: string;
  latitude: number;
  longitude: number;
}

// ---------------------------------------- Charge State ---------------------------------------- //
interface ChargeStateDto {
  chargeLimitMax: number;
  chargeLimitMin: number;
  chargeRate: number;
  chargingState: PowerStateEnum;
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
  engineType: EngineTypeEnum;
  lastUpdated: string;
  model: string;
  name: string;
  vehicleVariant: string;
  vendor: string;
  vin: string;
}

// ---------------------------------------- Vehicle ---------------------------------------- //
export interface VehicleDetailDto {
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
