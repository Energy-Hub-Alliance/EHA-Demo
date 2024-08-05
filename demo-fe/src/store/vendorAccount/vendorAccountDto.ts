export interface VendorAccountDto {
  id: string;
  userId: string;
  subscriptionId: string;
  vendor: string;
  createdAt: string;
}

export interface VendorAccountPageEntry {
  content: VendorAccountDto[];
  totalElements: number;
  totalPages: number;
}
