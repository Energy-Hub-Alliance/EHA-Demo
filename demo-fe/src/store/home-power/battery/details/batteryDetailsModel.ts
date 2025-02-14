import { BatteryModeEnum } from '../../enums/batteryMode';
import { BatteryStateEnum } from '../../enums/batteryStateEnum';

interface BatteryDetailsStaticDataModel {
  last_updated: string;
  vendor: string;
  model: string;
  name: string;
  siteName: string;
  batteryCapacity: number;
}

interface BatteryDetailsStateModel {
  last_updated: string;
  stateOfCharge: number;
  chargeRate: number;
  maxChargeRate: number;
  maxDischargeRate: number;
  chargeLimitMin: number;
  chargeLimitMax: number;
  mode: BatteryModeEnum | null;
  state: BatteryStateEnum | null;
}

export interface BatteryDetailsModel {
  batteryId: string;
  userId: string;
  locationId: string;
  isOnline: boolean;
  last_updated: string;
  staticData: BatteryDetailsStaticDataModel;
  batteryState: BatteryDetailsStateModel;
}
