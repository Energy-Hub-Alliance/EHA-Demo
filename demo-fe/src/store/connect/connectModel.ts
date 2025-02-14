interface LogoUrlModel {
  light: string;
  dark: string;
}
export interface ConnectModel {
  vendors: VendorResponseModel[];
}

export interface VendorModel {
  id: string;
  name: string;
  required: string[];
  logoUrl: LogoUrlModel;
}

export interface VendorResponseModel extends VendorModel {
  type: string;
}
