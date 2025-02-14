export interface MeterModel {
  meterId: string;
  userId: string;
  meterName: string;
  siteName: string;
  model: string;
  vendor: string;
  last_updated: string;
  isOnline: boolean;
}

export interface MeterPageModel {
  meters: MeterModel[];
  totalElements: number;
  totalPages: number;
}
