export interface VehicleExternalDto {
  externalId: string;
  vin: string;
  vehicleName: string;
  vendor: string;
  isLinked: boolean;
}

export interface VehicleExternalPageEntry {
  content: VehicleExternalDto[];
  totalElements: number;
  totalPages: number;
}
