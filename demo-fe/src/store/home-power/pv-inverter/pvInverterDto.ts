export interface PvInverterDto {
  id: string;
  userId: string;
  name: string;
  siteName: string;
  model: string;
  vendor: string;
  lastUpdated: string;
  isOnline: boolean;
}

export interface PvInverterPageEntry {
  content: PvInverterDto[];
  totalElements: number;
  totalPages: number;
}
