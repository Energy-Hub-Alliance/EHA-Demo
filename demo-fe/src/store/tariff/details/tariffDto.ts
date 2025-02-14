interface StaticTariffDataDto {
  currency: string;
  countryCode: string;
  lastUpdated: string;
  vendor: string;
  name: string;
}

export interface TariffDetailDto {
  id: string;
  userId: string;
  locationId: string;
  isOnline: boolean;
  staticData: StaticTariffDataDto;
}
