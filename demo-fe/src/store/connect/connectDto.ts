export interface ConnectDto {
  vehicles: VendorResponse[];
  tariffs: VendorResponse[];
}

export interface VendorResponse {
  id: string;
  name: string;
  required: string[];
  logoUrl: string;
}
