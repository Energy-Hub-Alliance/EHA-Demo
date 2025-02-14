import { HvacMode } from '../enums/hvacModeEnum';
import { HvacType } from '../enums/hvacTypeEnum';

interface HvacDetailsStaticDataModel {
  capableModes: HvacMode;
  lastUpdated: string;
  model: string;
  name: string;
  room: string;
  type: HvacType;
  vendor: string;
}

export interface HvacDetailsTemperatureTargetModel {
  mode: HvacMode;
  temperature: number;
}

interface HvacDetailsClimateStateModel {
  isActive: boolean;
  lastUpdated: 'string';
  mode: HvacMode;
  temperatureCurrent: number;
  temperatureOutside: number;
  temperatureTargets: HvacDetailsTemperatureTargetModel[];
}

interface HvacDetailsPowerStateModel {
  lastUpdated: string;
  powerConsumption: number;
}

export interface HvacDetailsModel {
  climateState: HvacDetailsClimateStateModel;
  id: string;
  isOnline: boolean;
  lastUpdated: string;
  locationId: string;
  name: string;
  powerState: HvacDetailsPowerStateModel;
  staticData: HvacDetailsStaticDataModel;
  userId: string;
}
