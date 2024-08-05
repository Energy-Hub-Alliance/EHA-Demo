export interface VehiclesDto {
  id: string;
  userId: string;
  vin: string;
  vehicleName: string;
  vendor: string;
  model: string;
  isOnline: boolean;
  lastUpdated: string;
}

export interface VehiclePageEntry {
  content: VehiclesDto[];
  totalElements: number;
  totalPages: number;
}
