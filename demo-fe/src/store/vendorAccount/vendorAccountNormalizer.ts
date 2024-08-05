import { VendorAccountDto } from './vendorAccountDto';
import { VendorAccountModel } from './vendorAccountModel';

export const vendorAccountNormalizer = (
  vendorAccount: VendorAccountDto
): VendorAccountModel => {
  return {
    id: vendorAccount.id ?? '',
    userId: vendorAccount.userId ?? '',
    subscriptionId: vendorAccount.subscriptionId ?? '',
    vendor: vendorAccount.vendor ?? '',
    createdAt: vendorAccount.createdAt ?? '',
  };
};
