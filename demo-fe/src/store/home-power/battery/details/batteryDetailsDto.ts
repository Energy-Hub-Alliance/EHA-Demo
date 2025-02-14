import { BatteryModeEnum } from '../../enums/batteryMode';
import { BatteryStateEnum } from '../../enums/batteryStateEnum';

interface BatteryDetailsStaticDataDto {
  lastUpdated: string;
  vendor: string;
  model: string;
  name: string;
  siteName: string;
  batteryCapacity: number;
}

interface BatteryDetailsStateDto {
  lastUpdated: string;
  stateOfCharge: number;
  chargeRate: number;
  maxChargeRate: number;
  maxDischargeRate: number;
  chargeLimitMin: number;
  chargeLimitMax: number;
  mode: BatteryModeEnum;
  chargingState: BatteryStateEnum;
}

export interface BatteryDetailsDto {
  id: string;
  userId: string;
  locationId: string;
  isOnline: boolean;
  lastUpdated: string;
  staticData: BatteryDetailsStaticDataDto;
  chargeState: BatteryDetailsStateDto;
}
