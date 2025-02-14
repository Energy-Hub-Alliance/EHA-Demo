import { formatDateTime } from '../../util/formatDate';
import { HomePowerDetailsDto } from './homePowerDetailsDto';
import { HomePowerDetailsModel } from './homePowerDetailsModel';

export const homePowerDetailsNormalizer = (
  homePowerDetails: HomePowerDetailsDto
): HomePowerDetailsModel => {
  return {
    // id: string;
    id: homePowerDetails.id ?? '',
    // isOnline: boolean;
    isOnline: homePowerDetails.isOnline ?? false,
    // lastUpdated: string;
    lastUpdated: homePowerDetails.lastUpdated
      ? formatDateTime(homePowerDetails.lastUpdated)
      : '',
    // locationId: string;
    locationId: homePowerDetails.locationId ?? '',
    // name: string;
    name: homePowerDetails.name ?? '',
    // staticData: HvacDetailsStaticDataModel;
    staticData: {
      lastUpdated: homePowerDetails.staticData.lastUpdated ?? '',
      model: homePowerDetails.staticData.model ?? '',
      name: homePowerDetails.staticData.name ?? '',
      type: homePowerDetails.staticData.type,
      vendor: homePowerDetails.staticData.vendor,
    },
    // userId: string;
    userId: homePowerDetails.userId ?? '',
  };
};
