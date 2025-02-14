export interface ChargingHardwareExternalModel {
  externalId: string;
  id: string;
  chargerName: string;
  model: string;
  isLinked: boolean;
  manufacturer: string;
}

export interface ChargingHardwareExternalPageModel {
  content: ChargingHardwareExternalModel[];
  totalElements: number;
  totalPages: number;
}
