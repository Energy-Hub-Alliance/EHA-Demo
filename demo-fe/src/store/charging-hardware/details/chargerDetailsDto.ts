import { ChargingStateEnum } from '../enums/chargingStateEnum';

export interface ChargerDetailsDto {
  id: string;
  userId: string;
  isOnline: boolean;
  lastUpdated: string;
  location: string;
  staticData: {
    lastUpdated: string;
    name: string;
    model: string;
    vendor: string;
  };
  chargeState: {
    lastUpdated: string;
    chargeRate: number;
    chargeCurrentMax: number;
    activePhases: number;
    isPlugged: boolean;
    chargingState: ChargingStateEnum;
  };
}
