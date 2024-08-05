import { createApi } from '@reduxjs/toolkit/query/react';
import { createBaseQuery } from '../baseQuery';
import { environment } from '../../environment';
import { ConnectDto } from './connectDto';
import { ConnectModel } from './connectModel';

interface ConnectVehiceData {
  vendor: string | undefined;
  vin?: string;
}

interface ConnectTariffData {
  vendor: string | undefined;
}

export const connectApi = createApi({
  reducerPath: 'connectApi',
  tagTypes: ['Connect'],
  baseQuery: createBaseQuery(`${environment.demoAppServiceUrl}`),
  endpoints: (builder) => ({
    getConnectVehiclePath: builder.query<{ url: string }, ConnectVehiceData>({
      query: (provider) => ({
        url: `/connect/vehicles/${provider.vendor}`,
        method: 'GET',
        params: {
          vin: provider.vin ? provider.vin : undefined,
          redirectUrl: `${environment.demoAppDomain}/vehicles/callback`,
        },
      }),
    }),
    getConnectTariffsPath: builder.query<{ url: string }, ConnectTariffData>({
      query: (provider) => ({
        url: `/connect/tariffs/${provider.vendor}`,
        method: 'GET',
        params: {
          redirectUrl: `${environment.demoAppDomain}/smart-tariffs/callback`,
        },
      }),
    }),
    getAvailableVendors: builder.query<ConnectModel, void>({
      query: () => `/available-vendors`,
      transformResponse: (availableVendors: ConnectDto) => {
        return {
          smartEnergy: availableVendors.tariffs ?? [],
          vehicles: availableVendors.vehicles ?? [],
        };
      },
    }),
  }),
});

export const {
  useGetConnectVehiclePathQuery,
  useGetConnectTariffsPathQuery,
  useGetAvailableVendorsQuery,
} = connectApi;
