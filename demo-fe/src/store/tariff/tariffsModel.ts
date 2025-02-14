export interface TariffModel {
  tariffId: string;
  userId: string;
  tariffName: string;
  last_updated: string;
  isOnline: boolean;
  vendor: string;
}

export interface TariffsPageModel {
  tariffs: TariffModel[];
  totalElements: number;
  totalPages: number;
}
