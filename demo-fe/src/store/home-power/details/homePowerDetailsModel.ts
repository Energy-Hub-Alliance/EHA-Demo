import { HomePowerType } from '../enums/homePowerTypeEnum';

interface HomePowerDetailsStaticDataModel {
  lastUpdated: string;
  model: string;
  name: string;
  type: HomePowerType;
  vendor: string;
}

export interface HomePowerDetailsModel {
  id: string;
  isOnline: boolean;
  lastUpdated: string;
  locationId: string;
  name: string;
  staticData: HomePowerDetailsStaticDataModel;
  userId: string;
}
