export interface PvInverterModel {
  pvInverterId: string;
  userId: string;
  pvInverterName: string;
  siteName: string;
  model: string;
  vendor: string;
  last_updated: string;
  isOnline: boolean;
}

export interface PvInverterPageModel {
  pvInverters: PvInverterModel[];
  totalElements: number;
  totalPages: number;
}
