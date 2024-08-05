export interface TariffExternalDto {
  externalId: string;
  countryCode: string;
  tariffName: string;
  vendor: string;
  isLinked: boolean;
}

export interface TariffExternalPageEntry {
  content: TariffExternalDto[];
  totalElements: number;
  totalPages: number;
}
