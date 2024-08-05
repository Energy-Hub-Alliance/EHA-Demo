export interface TariffDto {
  id: string;
  userId: string;
  locationId: string;
  currency: string;
  countryCode: string;
  lastUpdated: string;
  isOnline: boolean;
  vendor: string;
}

export interface TariffPageEntry {
  content: TariffDto[];
  totalElements: number;
  totalPages: number;
}
