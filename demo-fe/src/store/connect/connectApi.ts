import { createApi } from '@reduxjs/toolkit/query/react';
import { createBaseQuery } from '../baseQuery';
import { environment } from '../../environment';
import { ConnectDto } from './connectDto';
import { ConnectModel } from './connectModel';
import { connectNormalizer } from './connectNormalizer';

interface ConnectVehiceData {
  vendor: string | undefined;
  vin?: string;
}

interface ConnectTariffData {
  vendor: string | undefined;
}

interface ConnectHvacData {
  vendor: string | undefined;
}

interface ConnectHomePowerData {
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
        refetchOnMountOrArgChange: true,
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
        refetchOnMountOrArgChange: true,
        method: 'GET',
        params: {
          redirectUrl: `${environment.demoAppDomain}/smart-tariffs/callback`,
        },
      }),
    }),
    getConnectHvacsPath: builder.query<{ url: string }, ConnectHvacData>({
      query: (provider) => ({
        url: `/connect/hvacs/${provider.vendor}`,
        refetchOnMountOrArgChange: true,
        method: 'GET',
        params: {
          redirectUrl: `${environment.demoAppDomain}/hvacs/callback`,
        },
      }),
    }),

    getConnectHomePowerPath: builder.query<
      { url: string },
      ConnectHomePowerData
    >({
      query: (provider) => ({
        url: `/connect/home-powers/${provider.vendor}`,
        refetchOnMountOrArgChange: true,
        method: 'GET',
        params: {
          redirectUrl: `${environment.demoAppDomain}/home-power/callback`,
        },
      }),
    }),

    getConnectChargingHardwarePath: builder.query<
      { url: string },
      ConnectHomePowerData
    >({
      query: (provider) => ({
        url: `/connect/chargers/${provider.vendor}`,
        refetchOnMountOrArgChange: true,
        method: 'GET',
        params: {
          redirectUrl: `${environment.demoAppDomain}/charging-hardware/callback`,
        },
      }),
    }),
    getAvailableVendors: builder.query<ConnectModel, void>({
      query: () => `/available-vendors`,
      transformResponse: (availableVendors: ConnectDto) =>
        connectNormalizer(availableVendors),
    }),
  }),
});

export const {
  useGetConnectVehiclePathQuery,
  useGetConnectTariffsPathQuery,
  useGetConnectHvacsPathQuery,
  useGetConnectHomePowerPathQuery,
  useGetConnectChargingHardwarePathQuery,
  useGetAvailableVendorsQuery,
} = connectApi;
