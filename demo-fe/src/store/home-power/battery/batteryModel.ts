import { BatteryStateEnum } from '../enums/batteryStateEnum';

export interface BatteryModel {
  batteryId: string;
  userId: string;
  batteryName: string;
  siteName: string;
  model: string;
  vendor: string;
  last_updated: string;
  isOnline: boolean;
  state: BatteryStateEnum | null;
}

export interface BatteryPageModel {
  batteries: BatteryModel[];
  totalElements: number;
  totalPages: number;
}
