export interface ChargingHardwareExternalDto {
  externalId: string;
  id: string;
  name: string;
  model: string;
  isLinked: boolean;
  vendor: string;
}

export interface ChargingHardwareExternalPageEntry {
  content: ChargingHardwareExternalDto[];
  totalElements: number;
  totalPages: number;
}
