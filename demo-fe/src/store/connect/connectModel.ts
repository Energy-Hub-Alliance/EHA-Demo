export interface ConnectModel {
  vehicles: VendorResponseModel[];
  smartEnergy: VendorResponseModel[];
}

export interface VendorResponseModel {
  id: string;
  name: string;
  required: string[];
  logoUrl: string;
}
