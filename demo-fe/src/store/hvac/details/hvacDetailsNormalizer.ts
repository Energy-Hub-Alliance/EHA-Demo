import { formatDateTime } from '../../util/formatDate';
import { HvacDetailsDto } from './hvacDetailsDto';
import { HvacDetailsModel } from './hvacDetailsModel';

export const hvacDetailsNormalizer = (
  hvacDetails: HvacDetailsDto
): HvacDetailsModel => {
  return {
    // climateState: HvacDetailsClimateStateModel;
    climateState: {
      isActive: hvacDetails.climateState.isActive ?? false,
      lastUpdated: hvacDetails.climateState.lastUpdated ?? '',
      mode: hvacDetails.climateState.mode ?? '',
      temperatureCurrent: hvacDetails.climateState.temperatureCurrent ?? null,
      temperatureOutside: hvacDetails.climateState.temperatureOutside ?? null,
      temperatureTargets: hvacDetails.climateState.temperatureTargets ?? [],
    },
    // id: string;
    id: hvacDetails.id ?? '',
    // isOnline: boolean;
    isOnline: hvacDetails.isOnline ?? false,
    // lastUpdated: string;
    lastUpdated: hvacDetails.lastUpdated
      ? formatDateTime(hvacDetails.lastUpdated)
      : '',
    // locationId: string;
    locationId: hvacDetails.locationId ?? '',
    // name: string;
    name: hvacDetails.name ?? '',
    // powerState: HvacDetailsPowerStateModel;
    powerState: {
      lastUpdated: hvacDetails.powerState.lastUpdated ?? '',
      powerConsumption: hvacDetails.powerState.powerConsumption ?? null,
    },
    // staticData: HvacDetailsStaticDataModel;
    staticData: {
      capableModes: hvacDetails.staticData.capableModes ?? '',
      lastUpdated: hvacDetails.staticData.lastUpdated ?? '',
      model: hvacDetails.staticData.model ?? '',
      name: hvacDetails.staticData.name ?? '',
      room: hvacDetails.staticData.room ?? '',
      type: hvacDetails.staticData.type ?? '',
      vendor: hvacDetails.staticData.vendor ?? '',
    },
    // userId: string;
    userId: hvacDetails.userId ?? '',
  };
};
