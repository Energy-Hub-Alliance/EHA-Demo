import { InverterStateEnum } from '../../enums/inverterStateEnum';

interface PvInverterDetailsStaticDataDto {
  lastUpdated: string;
  vendor: string;
  model: string;
  name: string;
  siteName: string;
}

interface PvInverterDetailsPowerStateDto {
  lastUpdated: string;
  solarPower: number;
  state: InverterStateEnum;
}

export interface PvInverterDetailsDto {
  id: string;
  userId: string;
  locationId: string;
  isOnline: boolean;
  lastUpdated: string;
  staticData: PvInverterDetailsStaticDataDto;
  powerState: PvInverterDetailsPowerStateDto;
}
