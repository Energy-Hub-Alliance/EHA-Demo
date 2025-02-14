export interface VehicleModel {
  vehicleId: string;
  userId: string;
  vin: string;
  vehicleName: string;
  manufacturer: string;
  model: string;
  isOnline: boolean;
  lastUpdated: string;
}

export interface VehiclesPageModel {
  vehicles: VehicleModel[];
  totalElements: number;
  totalPages: number;
}
