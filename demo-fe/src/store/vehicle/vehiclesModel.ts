export interface VehiclesModel {
  vehicleId: string;
  userId: string;
  vin: string;
  vehicleName: string;
  manufacturer: string;
  model: string;
  isOnline: boolean;
  lastUpdated: string;
}

export interface VehiclePageModel {
  vehicles: VehiclesModel[];
  totalElements: number;
  totalPages: number;
}
