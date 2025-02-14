import { createApi } from '@reduxjs/toolkit/query/react';
import { createBaseQuery } from '../../baseQuery';
import { environment } from '../../../environment';
import { MeterDetailsDto } from './details/meterDetailsDto';
import { MeterDetailsModel } from './details/meterDetailsModel';
import { MeterDto, MeterPageEntry } from './meterDto';
import { MeterPageModel } from './meterModel';
import { meterNormalizer } from './meterNormalizer';
import { meterDetailsNormalizer } from './details/meterDetailsNormalizer';

export const meterApi = createApi({
  reducerPath: 'meterApi',
  tagTypes: ['Meter'],
  baseQuery: createBaseQuery(`${environment.demoAppServiceUrl}/meters`),
  endpoints: (builder) => ({
    getMeters: builder.query<MeterPageModel, void>({
      query: () => '',
      transformResponse: (meterResponse: MeterPageEntry) => {
        return {
          totalElements: meterResponse.totalElements,
          totalPages: meterResponse.totalPages,
          meters: meterResponse.content.map((meter: MeterDto) =>
            meterNormalizer(meter)
          ),
        };
      },
      providesTags: ['Meter'],
    }),

    getMeterDetails: builder.query<MeterDetailsModel, string>({
      keepUnusedDataFor: 0,
      query: (meterId) => `/${meterId}`,
      transformResponse: (meterDetailsResponse: MeterDetailsDto) =>
        meterDetailsNormalizer(meterDetailsResponse),
    }),

    getRefreshedMeterDetails: builder.query<MeterDetailsModel, string>({
      keepUnusedDataFor: 0,
      query: (meterId) => `/${meterId}/refresh`,
      transformResponse: (meterDetailsResponse: MeterDetailsDto) =>
        meterDetailsNormalizer(meterDetailsResponse),
      providesTags: ['Meter'],
    }),
    deleteMeter: builder.mutation<void, { meterId: string }>({
      query: ({ meterId }) => {
        return {
          url: `/${meterId}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: ['Meter'],
    }),
  }),
});

export const {
  useGetMetersQuery,
  useLazyGetRefreshedMeterDetailsQuery,
  useGetMeterDetailsQuery,
  useDeleteMeterMutation,
} = meterApi;
