export interface ChargerDto {
  id: string;
  userId: string;
  isOnline: boolean;
  name: string;
  vendor: string;
  model: string;
  lastUpdated: string;
}

export interface ChargingHardwareDto {
  content: ChargerDto[];
  totalElements: number;
  totalPages: number;
}
