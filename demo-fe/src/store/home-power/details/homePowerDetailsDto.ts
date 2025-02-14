import { HomePowerType } from '../enums/homePowerTypeEnum';

interface HomePowerDetailsStaticDataDto {
  lastUpdated: string;
  model: string;
  name: string;
  type: HomePowerType;
  vendor: string;
}

export interface HomePowerDetailsDto {
  id: string;
  isOnline: boolean;
  lastUpdated: string;
  locationId: string;
  name: string;
  staticData: HomePowerDetailsStaticDataDto;
  userId: string;
}
