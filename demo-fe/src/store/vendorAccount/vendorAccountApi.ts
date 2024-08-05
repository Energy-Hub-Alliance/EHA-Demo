import { createApi } from '@reduxjs/toolkit/query/react';
import { createBaseQuery } from '../baseQuery';
import {
  VendorAccountModel,
  VendorAccountPageModel,
} from './vendorAccountModel';
import { vendorAccountNormalizer } from './vendorAccountNormalizer';
import { VendorAccountDto, VendorAccountPageEntry } from './vendorAccountDto';
import { environment } from '../../environment';

export const vendorAccountApi = createApi({
  reducerPath: 'vendorAccountApi',
  tagTypes: ['VandorAccount'],
  baseQuery: createBaseQuery(
    `${environment.demoAppServiceUrl}/vendor-accounts`
  ),
  endpoints: (builder) => ({
    getVendorAccounts: builder.query<VendorAccountPageModel, string>({
      query: () => ``,
      transformResponse: (vendorAccountResponse: VendorAccountPageEntry) => {
        return {
          totalElements: vendorAccountResponse.totalElements,
          totalPages: vendorAccountResponse.totalPages,
          vehicles: vendorAccountResponse.content.map(
            (vehicle: VendorAccountDto) => vendorAccountNormalizer(vehicle)
          ),
        };
      },
    }),

    getVendorAccount: builder.query<VendorAccountModel, string>({
      query: (vendorAccountId) => `/${vendorAccountId}`,
      transformResponse: (vendorAccount: VendorAccountDto) =>
        vendorAccountNormalizer(vendorAccount),
    }),
  }),
});

export const { useGetVendorAccountsQuery, useGetVendorAccountQuery } =
  vendorAccountApi;
