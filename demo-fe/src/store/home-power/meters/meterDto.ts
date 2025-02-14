export interface MeterDto {
  id: string;
  userId: string;
  name: string;
  siteName: string;
  model: string;
  vendor: string;
  lastUpdated: string;
  isOnline: boolean;
}

export interface MeterPageEntry {
  content: MeterDto[];
  totalElements: number;
  totalPages: number;
}
