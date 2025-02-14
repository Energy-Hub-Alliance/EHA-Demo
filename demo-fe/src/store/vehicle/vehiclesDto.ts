export interface VehicleDto {
  id: string;
  userId: string;
  vin: string;
  name: string;
  vendor: string;
  model: string;
  isOnline: boolean;
  lastUpdated: string;
}

export interface VehiclesPageEntry {
  content: VehicleDto[];
  totalElements: number;
  totalPages: number;
}
