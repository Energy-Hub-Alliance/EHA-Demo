export interface VendorAccountModel {
  id: string;
  userId: string;
  subscriptionId: string;
  vendor: string;
  createdAt: string;
}

export interface VendorAccountPageModel {
  vehicles: VendorAccountModel[];
  totalElements: number;
  totalPages: number;
}
