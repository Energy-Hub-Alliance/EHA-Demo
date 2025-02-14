export interface VehicleExternalDto {
  externalId: string;
  vin: string;
  name: string;
  vendor: string;
  isLinked: boolean;
}

export interface VehicleExternalPageEntry {
  content: VehicleExternalDto[];
  totalElements: number;
  totalPages: number;
}
