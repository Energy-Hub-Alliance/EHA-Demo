import { createApi } from '@reduxjs/toolkit/query/react';
import { createBaseQuery } from '../baseQuery';
import { environment } from '../../environment';
import { SelectVehiclesFormData } from '../../core/components/pages/linkVehicles/SelectVehiclesForm';
import { VehicleExternalPageModel } from './vehicleExternalModel';
import { vehicleExternalNormalizer } from './vehicleExternalNormalizer';
import {
  VehicleExternalDto,
  VehicleExternalPageEntry,
} from './vehicleExternalDto';
import {
  TariffExternalDto,
  TariffExternalPageEntry,
} from './tariffExternalDto';
import { TariffExternalPageModel } from './tariffExternalModel';
import { tariffExternalNormalizer } from './tariffExternalNormalizer';

export const linkApi = createApi({
  reducerPath: 'linkApi',
  tagTypes: ['Link'],
  baseQuery: createBaseQuery(`${environment.demoAppServiceUrl}/link`),
  endpoints: (builder) => ({
    linkVehicle: builder.mutation<
      VehicleExternalDto[],
      { vendorAccountId: string; body: SelectVehiclesFormData }
    >({
      query: ({ vendorAccountId, body }) => ({
        url: `/vendor-accounts/${vendorAccountId}/vehicles`,
        method: 'POST',
        body,
      }),
    }),

    getVendorAccountVehicles: builder.query<VehicleExternalPageModel, string>({
      query: (vendorAccountId) => ({
        url: `/vendor-accounts/${vendorAccountId}/vehicles`,
      }),
      transformResponse: (vendorAccountResponse: VehicleExternalPageEntry) => {
        return {
          totalElements: vendorAccountResponse.totalElements,
          totalPages: vendorAccountResponse.totalPages,
          vehicles: vendorAccountResponse.content.map(
            (vehicle: VehicleExternalDto) => vehicleExternalNormalizer(vehicle)
          ),
        };
      },
    }),

    linkTariff: builder.mutation<
      TariffExternalDto[],
      { vendorAccountId: string; externalTariffs: string[] }
    >({
      query: ({ vendorAccountId, externalTariffs }) => ({
        url: `/vendor-accounts/${vendorAccountId}/tariffs`,
        method: 'POST',
        body: {
          externalTariffs,
        },
      }),
    }),

    getVendorAccountTariffs: builder.query<TariffExternalPageModel, string>({
      query: (vendorAccountId) => ({
        url: `/vendor-accounts/${vendorAccountId}/tariffs`,
      }),
      transformResponse: (vendorAccountResponse: TariffExternalPageEntry) => {
        return {
          totalElements: vendorAccountResponse.totalElements,
          totalPages: vendorAccountResponse.totalPages,
          tariffs: vendorAccountResponse.content.map(
            (tariff: TariffExternalDto) => tariffExternalNormalizer(tariff)
          ),
        };
      },
    }),
  }),
});

export const {
  useLinkVehicleMutation,
  useGetVendorAccountVehiclesQuery,
  useLinkTariffMutation,
  useGetVendorAccountTariffsQuery,
} = linkApi;
