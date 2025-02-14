export interface ChargerModel {
  chargerId: string;
  userId: string;
  isOnline: boolean;
  chargerName: string;
  chargerModel: string;
  vendor: string;
  last_updated: string;
}

export interface ChargingHardwarePageModel {
  chargers: ChargerModel[];
  totalElements: number;
  totalPages: number;
}
