interface LogoUrlDto {
  light: string;
  dark: string;
}
export interface ConnectDto {
  vehicles: VendorResponse[];
  tariffs: VendorResponse[];
  hvac: VendorResponse[];
  homePower: VendorResponse[];
  chargers: VendorResponse[];
}

export interface VendorResponse {
  id: string;
  name: string;
  required: string[];
  logoUrl: LogoUrlDto;
}
