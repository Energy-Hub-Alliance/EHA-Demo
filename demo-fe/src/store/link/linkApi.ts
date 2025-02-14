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
import { HvacExternalDto, HvacExternalPageEntry } from './hvacExternalDto';
import { HvacExternalPageModel } from './hvacExternalModel';
import { hvacExternalNormalizer } from './hvacExternalNormalizer';
import { SelectHvacsFormData } from '../../core/components/pages/linkHvacs/SelectHvacsForm';
import {
  HomePowerExternalDto,
  HomePowerExternalPageEntry,
} from './homePowerExternalDto';
import { HomePowerExternalPageModel } from './homePowerExternalModel';
import { homePowerExternalNormalizer } from './homePowerExternalNormalizer';
import {
  ChargingHardwareExternalDto,
  ChargingHardwareExternalPageEntry,
} from './chargingHardwareExternalDto';
import { ChargingHardwareExternalPageModel } from './chargingHardwareExternalModel';
import { chargingHardwareExternalNormalizer } from './chargingHardwareNormalizer';

interface SelectChargersFormData {
  vendor: string;
  externalChargers: string[];
}

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

    linkHvac: builder.mutation<
      HvacExternalDto[],
      { vendorAccountId: string; body: SelectHvacsFormData }
    >({
      query: ({ vendorAccountId, body }) => ({
        url: `/vendor-accounts/${vendorAccountId}/hvacs`,
        method: 'POST',
        body,
      }),
    }),

    getVendorAccountHvacs: builder.query<HvacExternalPageModel, string>({
      query: (vendorAccountId) => ({
        url: `/vendor-accounts/${vendorAccountId}/hvacs`,
      }),
      transformResponse: (vendorAccountResponse: HvacExternalPageEntry) => {
        return {
          totalElements: vendorAccountResponse.totalElements,
          totalPages: vendorAccountResponse.totalPages,
          hvacs: vendorAccountResponse.content.map((hvac: HvacExternalDto) =>
            hvacExternalNormalizer(hvac)
          ),
        };
      },
    }),

    linkMeter: builder.mutation<
      HomePowerExternalDto[],
      { vendorAccountId: string; externalMeters: string[] }
    >({
      query: ({ vendorAccountId, externalMeters }) => ({
        url: `/vendor-accounts/${vendorAccountId}/meters`,
        method: 'POST',
        body: {
          externalMeters,
        },
      }),
    }),

    getVendorAccountMeter: builder.query<HomePowerExternalPageModel, string>({
      query: (vendorAccountId) => ({
        url: `/vendor-accounts/${vendorAccountId}/meters`,
      }),
      transformResponse: (
        vendorAccountResponse: HomePowerExternalPageEntry
      ) => {
        return {
          totalElements: vendorAccountResponse.totalElements,
          totalPages: vendorAccountResponse.totalPages,
          homePower: vendorAccountResponse.content.map(
            (homePower: HomePowerExternalDto) =>
              homePowerExternalNormalizer(homePower)
          ),
        };
      },
    }),

    linkBattery: builder.mutation<
      HomePowerExternalDto[],
      { vendorAccountId: string; externalBatteries: string[] }
    >({
      query: ({ vendorAccountId, externalBatteries }) => ({
        url: `/vendor-accounts/${vendorAccountId}/batteries`,
        method: 'POST',
        body: {
          externalBatteries,
        },
      }),
    }),

    getVendorAccountBattery: builder.query<HomePowerExternalPageModel, string>({
      query: (vendorAccountId) => ({
        url: `/vendor-accounts/${vendorAccountId}/batteries`,
      }),
      transformResponse: (
        vendorAccountResponse: HomePowerExternalPageEntry
      ) => {
        return {
          totalElements: vendorAccountResponse.totalElements,
          totalPages: vendorAccountResponse.totalPages,
          homePower: vendorAccountResponse.content.map(
            (homePower: HomePowerExternalDto) =>
              homePowerExternalNormalizer(homePower)
          ),
        };
      },
    }),

    linkInverter: builder.mutation<
      HomePowerExternalDto[],
      { vendorAccountId: string; externalPvInverters: string[] }
    >({
      query: ({ vendorAccountId, externalPvInverters }) => ({
        url: `/vendor-accounts/${vendorAccountId}/pv-inverters`,
        method: 'POST',
        body: { externalPvInverters },
      }),
    }),

    getVendorAccountInverter: builder.query<HomePowerExternalPageModel, string>(
      {
        query: (vendorAccountId) => ({
          url: `/vendor-accounts/${vendorAccountId}/pv-inverters`,
        }),
        transformResponse: (
          vendorAccountResponse: HomePowerExternalPageEntry
        ) => {
          return {
            totalElements: vendorAccountResponse.totalElements,
            totalPages: vendorAccountResponse.totalPages,
            homePower: vendorAccountResponse.content.map(
              (homePower: HomePowerExternalDto) =>
                homePowerExternalNormalizer(homePower)
            ),
          };
        },
      }
    ),

    linkCharger: builder.mutation<
      ChargingHardwareExternalDto[],
      { vendorAccountId: string; body: SelectChargersFormData }
    >({
      query: ({ vendorAccountId, body }) => ({
        url: `/vendor-accounts/${vendorAccountId}/chargers`,
        method: 'POST',
        body,
      }),
    }),

    getVendorAccountCharger: builder.query<
      ChargingHardwareExternalPageModel,
      string
    >({
      query: (vendorAccountId) => ({
        url: `/vendor-accounts/${vendorAccountId}/chargers`,
      }),
      transformResponse: (
        vendorAccountResponse: ChargingHardwareExternalPageEntry
      ) => {
        return {
          totalElements: vendorAccountResponse.totalElements,
          totalPages: vendorAccountResponse.totalPages,
          content: vendorAccountResponse.content.map(
            (charger: ChargingHardwareExternalDto) =>
              chargingHardwareExternalNormalizer(charger)
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
  useLinkHvacMutation,
  useGetVendorAccountHvacsQuery,
  useGetVendorAccountBatteryQuery,
  useGetVendorAccountInverterQuery,
  useGetVendorAccountMeterQuery,
  useGetVendorAccountChargerQuery,
  useLinkChargerMutation,
  useLinkBatteryMutation,
  useLinkInverterMutation,
  useLinkMeterMutation,
} = linkApi;
