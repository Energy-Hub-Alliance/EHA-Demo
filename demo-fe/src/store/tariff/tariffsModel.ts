export interface TariffModel {
  tariffId: string;
  userId: string;
  locationId: string;
  currency: string;
  country: string;
  last_updated: string;
  isOnline: boolean;
  vendor: string;
}

export interface TariffPageModel {
  tariffs: TariffModel[];
  totalElements: number;
  totalPages: number;
}
