import { HvacMode } from '../enums/hvacModeEnum';
import { HvacType } from '../enums/hvacTypeEnum';

interface HvacDetailsStaticDataDto {
  capableModes: HvacMode;
  lastUpdated: string;
  model: string;
  name: string;
  room: string;
  type: HvacType;
  vendor: string;
}

interface HvacDetailsTemperatureTargetDto {
  mode: HvacMode;
  temperature: number;
}

interface HvacDetailsClimateStateDto {
  isActive: boolean;
  lastUpdated: 'string';
  mode: HvacMode;
  temperatureCurrent: number;
  temperatureOutside: number;
  temperatureTargets: HvacDetailsTemperatureTargetDto[];
}

interface HvacDetailsPowerStateDto {
  lastUpdated: string;
  powerConsumption: number;
}

export interface HvacDetailsDto {
  climateState: HvacDetailsClimateStateDto;
  id: string;
  isOnline: boolean;
  lastUpdated: string;
  locationId: string;
  name: string;
  powerState: HvacDetailsPowerStateDto;
  staticData: HvacDetailsStaticDataDto;
  userId: string;
}
