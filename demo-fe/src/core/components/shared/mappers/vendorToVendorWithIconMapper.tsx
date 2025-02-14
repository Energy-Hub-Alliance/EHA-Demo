import { VendorResponseModel } from '../../../../store/connect/connectModel';

export type VendorWithIcon = {
  id: string;
  name: string;
  required: string[];
  Icon: JSX.Element;
  type: string;
};

export const vendorToVendorWithIconMapper = (
  vendor: VendorResponseModel
): VendorWithIcon => {
  const Icon = <img height={24} src={vendor.logoUrl.dark} />;
  return {
    id: vendor.id ?? '',
    name: vendor.name ?? '',
    required: vendor.required ?? [],
    Icon: Icon ?? <></>,
    type: vendor.type ?? '',
  };
};
