import { formatDateTime } from '../../../util/formatDate';
import { InverterStateEnum } from '../../enums/inverterStateEnum';
import { PvInverterDetailsDto } from './pvInverterDetailsDto';
import { PvInverterDetailsModel } from './pvInverterDetailsModel';

export const pvInverterDetailsNormalizer = (
  pvInverterDetails: PvInverterDetailsDto
): PvInverterDetailsModel => {
  return {
    // id: string;
    pvInverterId: pvInverterDetails.id ?? '',
    // isOnline: boolean;
    isOnline: pvInverterDetails.isOnline ?? false,
    // locationId: string;
    locationId: pvInverterDetails.locationId ?? '',
    // userId: string;
    userId: pvInverterDetails.userId ?? '',
    // lastUpdated: string;
    last_updated: pvInverterDetails?.lastUpdated
      ? formatDateTime(pvInverterDetails.lastUpdated)
      : '',
    // staticData: PvInverterDetailsStaticDataModel;
    staticData: {
      last_updated: pvInverterDetails?.staticData?.lastUpdated
        ? formatDateTime(pvInverterDetails.staticData.lastUpdated)
        : '',
      vendor: pvInverterDetails?.staticData?.vendor,
      model: pvInverterDetails?.staticData?.model ?? '',
      name: pvInverterDetails?.staticData?.name ?? '',
      siteName: pvInverterDetails?.staticData.siteName ?? '',
    },
    // powerState: PvInverterDetailsPowerStateModel;
    powerState: {
      last_updated: pvInverterDetails?.powerState?.lastUpdated
        ? formatDateTime(pvInverterDetails.powerState.lastUpdated)
        : '',
      solarPower: pvInverterDetails?.powerState?.solarPower ?? null,
      state: pvInverterDetails?.powerState?.state
        ? (pvInverterDetails.powerState.state.toUpperCase() as InverterStateEnum)
        : null,
    },
  };
};
