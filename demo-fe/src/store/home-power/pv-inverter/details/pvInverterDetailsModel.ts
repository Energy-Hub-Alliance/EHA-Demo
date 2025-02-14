import { InverterStateEnum } from '../../enums/inverterStateEnum';

interface PvInverterDetailsStaticDataModel {
  last_updated: string;
  vendor: string;
  model: string;
  name: string;
  siteName: string;
}

interface PvInverterDetailsPowerStateModel {
  last_updated: string;
  solarPower: number;
  state: InverterStateEnum | null;
}

export interface PvInverterDetailsModel {
  pvInverterId: string;
  userId: string;
  locationId: string;
  isOnline: boolean;
  last_updated: string;
  staticData: PvInverterDetailsStaticDataModel;
  powerState: PvInverterDetailsPowerStateModel;
}
