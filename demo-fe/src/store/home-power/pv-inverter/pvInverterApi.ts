import { createApi } from '@reduxjs/toolkit/query/react';
import { createBaseQuery } from '../../baseQuery';
import { environment } from '../../../environment';
import { PvInverterPageModel } from './pvInverterModel';
import { PvInverterDto, PvInverterPageEntry } from './pvInverterDto';
import { pvInverterNormalizer } from './pvInverterNormalizer';
import { PvInverterDetailsModel } from './details/pvInverterDetailsModel';
import { PvInverterDetailsDto } from './details/pvInverterDetailsDto';
import { pvInverterDetailsNormalizer } from './details/pvInverterDetailsNormalizer';

export const pvInverterApi = createApi({
  reducerPath: 'pvInverterApi',
  tagTypes: ['PvInverter'],
  baseQuery: createBaseQuery(`${environment.demoAppServiceUrl}/pv-inverters`),
  endpoints: (builder) => ({
    getPvInverters: builder.query<PvInverterPageModel, void>({
      query: () => '',
      transformResponse: (pvInverterResponse: PvInverterPageEntry) => {
        return {
          totalElements: pvInverterResponse.totalElements,
          totalPages: pvInverterResponse.totalPages,
          pvInverters: pvInverterResponse.content.map(
            (pvInverter: PvInverterDto) => pvInverterNormalizer(pvInverter)
          ),
        };
      },
      providesTags: ['PvInverter'],
    }),

    getPvInverterDetails: builder.query<PvInverterDetailsModel, string>({
      keepUnusedDataFor: 0,
      query: (pvInverterId) => `/${pvInverterId}`,
      transformResponse: (pvInverterDetailsResponse: PvInverterDetailsDto) =>
        pvInverterDetailsNormalizer(pvInverterDetailsResponse),
    }),

    getRefreshedPvInverterDetails: builder.query<
      PvInverterDetailsModel,
      string
    >({
      keepUnusedDataFor: 0,
      query: (pvInverterId) => `/${pvInverterId}/refresh`,
      transformResponse: (pvInverterDetailsResponse: PvInverterDetailsDto) =>
        pvInverterDetailsNormalizer(pvInverterDetailsResponse),
      providesTags: ['PvInverter'],
    }),
    deletePvInverter: builder.mutation<void, { inverterId: string }>({
      query: ({ inverterId }) => {
        return {
          url: `/${inverterId}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: ['PvInverter'],
    }),
  }),
});

export const {
  useGetPvInvertersQuery,
  useLazyGetRefreshedPvInverterDetailsQuery,
  useGetPvInverterDetailsQuery,
  useDeletePvInverterMutation,
} = pvInverterApi;
