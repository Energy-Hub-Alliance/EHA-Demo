interface MeterDetailsStaticDataModel {
  last_updated: string;
  vendor: string;
  model: string;
  name: string;
  siteName: string;
}

interface MeterDetailsStateModel {
  last_updated: string;
  power: number;
  meterValue: number;
}

export interface MeterDetailsModel {
  meterId: string;
  userId: string;
  locationId: string;
  isOnline: boolean;
  last_updated: string;
  staticData: MeterDetailsStaticDataModel;
  powerState: MeterDetailsStateModel;
}
