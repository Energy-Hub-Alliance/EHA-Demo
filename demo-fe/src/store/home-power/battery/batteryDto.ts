import { BatteryStateEnum } from '../enums/batteryStateEnum';

export interface BatteryDto {
  id: string;
  userId: string;
  name: string;
  siteName: string;
  model: string;
  vendor: string;
  lastUpdated: string;
  isOnline: boolean;
  state: BatteryStateEnum;
}

export interface BatteryPageEntry {
  content: BatteryDto[];
  totalElements: number;
  totalPages: number;
}
