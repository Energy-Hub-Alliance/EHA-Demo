import { formatDateTime } from '../../../util/formatDate';
import { BatteryModeEnum } from '../../enums/batteryMode';
import { BatteryStateEnum } from '../../enums/batteryStateEnum';
import { BatteryDetailsDto } from './batteryDetailsDto';
import { BatteryDetailsModel } from './batteryDetailsModel';

export const batteryDetailsNormalizer = (
  batteryDetails: BatteryDetailsDto
): BatteryDetailsModel => {
  return {
    // id: string;
    batteryId: batteryDetails.id ?? '',
    // isOnline: boolean;
    isOnline: batteryDetails.isOnline ?? false,
    // locationId: string;
    locationId: batteryDetails.locationId ?? '',
    // userId: string;
    userId: batteryDetails.userId ?? '',
    // last_updated: string;
    last_updated: batteryDetails?.lastUpdated
      ? formatDateTime(batteryDetails.lastUpdated)
      : '',
    // staticData: BatteryDetailsStaticDataModel;
    staticData: {
      last_updated: batteryDetails?.staticData?.lastUpdated
        ? formatDateTime(batteryDetails.staticData.lastUpdated)
        : '',
      vendor: batteryDetails?.staticData?.vendor,
      model: batteryDetails?.staticData?.model ?? '',
      name: batteryDetails?.staticData?.name ?? '',
      siteName: batteryDetails?.staticData.siteName ?? '',
      batteryCapacity: batteryDetails?.staticData?.batteryCapacity ?? null,
    },
    // batteryState: BatteryDetailsStateModel;
    batteryState: {
      last_updated: batteryDetails?.chargeState?.lastUpdated
        ? formatDateTime(batteryDetails.chargeState.lastUpdated)
        : '',
      stateOfCharge: batteryDetails?.chargeState?.stateOfCharge ?? null,
      chargeRate: batteryDetails?.chargeState?.chargeRate ?? null,
      maxChargeRate: batteryDetails?.chargeState?.maxChargeRate ?? null,
      maxDischargeRate: batteryDetails?.chargeState?.maxDischargeRate ?? null,
      chargeLimitMin: batteryDetails?.chargeState?.chargeLimitMin ?? null,
      chargeLimitMax: batteryDetails?.chargeState?.chargeLimitMax ?? null,
      mode: batteryDetails?.chargeState?.mode
        ? (batteryDetails.chargeState.mode.toUpperCase() as BatteryModeEnum)
        : null,
      state: batteryDetails?.chargeState?.chargingState
        ? (batteryDetails.chargeState.chargingState.toUpperCase() as BatteryStateEnum)
        : null,
    },
  };
};
