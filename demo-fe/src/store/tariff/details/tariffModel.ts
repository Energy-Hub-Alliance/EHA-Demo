interface StaticTariffData {
  currency: string;
  countryCode: string;
  last_updated: string;
  vendor: string;
  tariffName: string;
}

export interface TariffDetailModel {
  tariffId: string;
  userId: string;
  locationId: string;
  isOnline: boolean;
  staticData: StaticTariffData;
}
