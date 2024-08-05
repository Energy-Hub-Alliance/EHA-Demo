export interface VehicleExternalModel {
  externalVehicleId: string;
  vin: string;
  vehicleName: string;
  manufacturer: string;
  linked: boolean;
}

export interface VehicleExternalPageModel {
  vehicles: VehicleExternalModel[];
  totalElements: number;
  totalPages: number;
}
