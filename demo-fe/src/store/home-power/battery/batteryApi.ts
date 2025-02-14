import { createApi } from '@reduxjs/toolkit/query/react';
import { createBaseQuery } from '../../baseQuery';
import { environment } from '../../../environment';
import { BatteryPageModel } from './batteryModel';
import { BatteryDto, BatteryPageEntry } from './batteryDto';
import { batteryNormalizer } from './batteryNormalizer';
import { BatteryDetailsModel } from './details/batteryDetailsModel';
import { BatteryDetailsDto } from './details/batteryDetailsDto';
import { batteryDetailsNormalizer } from './details/batteryDetailsNormalizer';

export const batteryApi = createApi({
  reducerPath: 'batteryApi',
  tagTypes: ['Battery'],
  baseQuery: createBaseQuery(`${environment.demoAppServiceUrl}/batteries`),
  endpoints: (builder) => ({
    getBatteries: builder.query<BatteryPageModel, void>({
      query: () => '',
      transformResponse: (pvInverterResponse: BatteryPageEntry) => {
        return {
          totalElements: pvInverterResponse.totalElements,
          totalPages: pvInverterResponse.totalPages,
          batteries: pvInverterResponse.content.map((battery: BatteryDto) =>
            batteryNormalizer(battery)
          ),
        };
      },
      providesTags: ['Battery'],
    }),

    getBatteryDetails: builder.query<BatteryDetailsModel, string>({
      keepUnusedDataFor: 0,
      query: (batteryId) => `/${batteryId}`,
      transformResponse: (batteryDetailsResponse: BatteryDetailsDto) =>
        batteryDetailsNormalizer(batteryDetailsResponse),
    }),

    getRefreshedBatteryDetails: builder.query<BatteryDetailsModel, string>({
      keepUnusedDataFor: 0,
      query: (batteryId) => `/${batteryId}/refresh`,
      transformResponse: (batteryDetailsResponse: BatteryDetailsDto) =>
        batteryDetailsNormalizer(batteryDetailsResponse),
      providesTags: ['Battery'],
    }),
    deleteBattery: builder.mutation<void, { batteryId: string }>({
      query: ({ batteryId }) => {
        return {
          url: `/${batteryId}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: ['Battery'],
    }),
  }),
});

export const {
  useGetBatteriesQuery,
  useLazyGetRefreshedBatteryDetailsQuery,
  useGetBatteryDetailsQuery,
  useDeleteBatteryMutation,
} = batteryApi;
