import { formatDateTime } from '../../util/formatDate';
import { ChargingStateEnum } from '../enums/chargingStateEnum';
import { ChargerDetailsDto } from './chargerDetailsDto';
import { ChargerDetailsModel } from './chargerDetailsModel';

export const chargerDetailsNormalizer = (
  chargerDetails: ChargerDetailsDto
): ChargerDetailsModel => {
  return {
    id: chargerDetails.id ?? '',
    userId: chargerDetails.userId ?? '',
    isOnline: chargerDetails.isOnline ?? false,
    lastUpdated: chargerDetails.lastUpdated
      ? formatDateTime(chargerDetails.lastUpdated)
      : '',
    location: chargerDetails.location ?? '',
    staticData: {
      lastUpdated: chargerDetails.staticData.lastUpdated
        ? formatDateTime(chargerDetails.staticData.lastUpdated)
        : '',
      name: chargerDetails.staticData.name ?? '',
      model: chargerDetails.staticData.model ?? '',
      vendor: chargerDetails.staticData.vendor,
    },
    chargeState: {
      lastUpdated: chargerDetails.chargeState.lastUpdated
        ? formatDateTime(chargerDetails.chargeState.lastUpdated)
        : '',
      chargeRate: chargerDetails.chargeState.chargeRate ?? null,
      chargeCurrentMax: chargerDetails.chargeState.chargeCurrentMax ?? null,
      activePhases: chargerDetails.chargeState.activePhases ?? null,
      isPlugged: chargerDetails.chargeState.isPlugged ?? false,
      chargingState: chargerDetails.chargeState.chargingState
        ? (chargerDetails.chargeState.chargingState.toUpperCase() as ChargingStateEnum)
        : null,
    },
  };
};
