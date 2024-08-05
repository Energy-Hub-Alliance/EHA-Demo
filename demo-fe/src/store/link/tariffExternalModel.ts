export interface TariffExternalModel {
  externalId: string;
  countryCode: string;
  tariffName: string;
  manufacturer: string;
  linked: boolean;
}

export interface TariffExternalPageModel {
  tariffs: TariffExternalModel[];
  totalElements: number;
  totalPages: number;
}
