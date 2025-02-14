import { formatDateTime } from '../../../util/formatDate';
import { MeterDetailsDto } from './meterDetailsDto';
import { MeterDetailsModel } from './meterDetailsModel';

export const meterDetailsNormalizer = (
  meterDetails: MeterDetailsDto
): MeterDetailsModel => {
  return {
    // id: string;
    meterId: meterDetails.id ?? '',
    // isOnline: boolean;
    isOnline: meterDetails.isOnline ?? false,
    // locationId: string;
    locationId: meterDetails.locationId ?? '',
    // userId: string;
    userId: meterDetails.userId ?? '',
    // last_updated: string;
    last_updated: meterDetails?.lastUpdated
      ? formatDateTime(meterDetails.lastUpdated)
      : '',
    // staticData: BatteryDetailsStaticDataModel;
    staticData: {
      last_updated: meterDetails?.staticData?.lastUpdated
        ? formatDateTime(meterDetails.staticData.lastUpdated)
        : '',
      vendor: meterDetails?.staticData?.vendor,
      model: meterDetails?.staticData?.model ?? '',
      name: meterDetails?.staticData?.name ?? '',
      siteName: meterDetails?.staticData.name ?? '',
    },
    // batteryState: BatteryDetailsStateModel;
    powerState: {
      last_updated: meterDetails?.powerState?.lastUpdated
        ? formatDateTime(meterDetails.powerState.lastUpdated)
        : '',
      meterValue: meterDetails?.powerState?.meterValue ?? null,
      power: meterDetails?.powerState?.power ?? null,
    },
  };
};
