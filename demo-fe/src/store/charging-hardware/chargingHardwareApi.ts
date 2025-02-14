import { createApi } from '@reduxjs/toolkit/query/react';
import { createBaseQuery } from '../baseQuery';
import { environment } from '../../environment';
import { ChargingHardwarePageModel } from './chargingHardwareModel';
import { ChargerDto, ChargingHardwareDto } from './chargingHardwareDto';
import { chargingHardwareNormalizer } from './chargingHardwareNormalizer';
import { ChargerDetailsModel } from './details/chargerDetailsModel';
import { ChargerDetailsDto } from './details/chargerDetailsDto';
import { chargerDetailsNormalizer } from './details/chargerDetailsNormalizer';

export const chargingHardwareApi = createApi({
  reducerPath: 'chargerApi',
  tagTypes: ['Chargers'],
  baseQuery: createBaseQuery(`${environment.demoAppServiceUrl}/chargers`),
  endpoints: (builder) => ({
    getChargers: builder.query<ChargingHardwarePageModel, void>({
      query: () => '',
      transformResponse: (chargerResponse: ChargingHardwareDto) => {
        return {
          totalElements: chargerResponse.totalElements,
          totalPages: chargerResponse.totalPages,
          chargers: chargerResponse.content.map((charger: ChargerDto) =>
            chargingHardwareNormalizer(charger)
          ),
        };
      },
      providesTags: ['Chargers'],
    }),
    getChargerDetails: builder.query<ChargerDetailsModel, string>({
      keepUnusedDataFor: 0,
      query: (chargerId) => `/${chargerId}`,
      transformResponse: (chargerDetailsResponse: ChargerDetailsDto) =>
        chargerDetailsNormalizer(chargerDetailsResponse),
    }),

    getRefreshedChargerDetails: builder.query<ChargerDetailsModel, string>({
      keepUnusedDataFor: 0,
      query: (chargerId) => `/${chargerId}/refresh`,
      transformResponse: (chargerDetailsResponse: ChargerDetailsDto) =>
        chargerDetailsNormalizer(chargerDetailsResponse),
      providesTags: ['Chargers'],
    }),

    deleteCharger: builder.mutation<void, { chargerId: string }>({
      query: ({ chargerId }) => {
        return {
          url: `/${chargerId}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: ['Chargers'],
    }),
  }),
});

export const {
  useGetChargersQuery,
  useGetChargerDetailsQuery,
  useLazyGetRefreshedChargerDetailsQuery,
  useDeleteChargerMutation,
} = chargingHardwareApi;
