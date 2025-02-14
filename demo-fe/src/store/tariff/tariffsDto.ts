export interface TariffDto {
  id: string;
  userId: string;
  name: string;
  lastUpdated: string;
  isOnline: boolean;
  vendor: string;
}

export interface TariffsPageEntry {
  content: TariffDto[];
  totalElements: number;
  totalPages: number;
}
