import { createApi } from '@reduxjs/toolkit/query/react';
import { createBaseQuery } from '../baseQuery';
import { environment } from '../../environment';
import { TariffsPageModel } from './tariffsModel';
import { tariffsNormalizer } from './tariffsNormalizer';
import { PriceModel } from './priceModel';
import { PriceDto } from './priceDto';
import { priceNormalizer } from './priceNormalizer';
import { ConsumptionModel, ConsumptionStatsModel } from './consumptionModel';
import { ConsumptionDto, ConsumptionStatsDto } from './consumptionDto';
import {
  consumptionNormalizer,
  consumptionStatsNormalizer,
} from './consumptionNormalizer';
import { ConsumptionPeriod } from '../../core/components/pages/smartTarrif/smartTariffUtils';
import { TariffDto, TariffsPageEntry } from './tariffsDto';
import { TariffDetailModel } from './details/tariffModel';
import { TariffDetailDto } from './details/tariffDto';
import { tariffDetailNormalizer } from './details/tariffNormalizer';

export const tariffApi = createApi({
  reducerPath: 'tariffApi',
  tagTypes: ['Tariffs'],
  baseQuery: createBaseQuery(`${environment.demoAppServiceUrl}/tariffs`),
  endpoints: (builder) => ({
    getTariffs: builder.query<TariffsPageModel, void>({
      query: () => '',
      transformResponse: (tariffsResponse: TariffsPageEntry) => {
        return {
          totalElements: tariffsResponse.totalElements,
          totalPages: tariffsResponse.totalPages,
          tariffs: tariffsResponse.content.map((tariff: TariffDto) =>
            tariffsNormalizer(tariff)
          ),
        };
      },
      providesTags: ['Tariffs'],
    }),
    getTariffDetails: builder.query<TariffDetailModel, string>({
      keepUnusedDataFor: 0,
      query: (tariffId) => `/${tariffId}`,
      transformResponse: (tariffDetailsResponse: TariffDetailDto) =>
        tariffDetailNormalizer(tariffDetailsResponse),
    }),
    getPriceData: builder.query<PriceModel[], string>({
      keepUnusedDataFor: 0,
      query: (tariffId) => `/${tariffId}/prices`,
      transformResponse: (prices: PriceDto[]) =>
        prices.map((price) => priceNormalizer(price)),
    }),

    getConsumptionData: builder.query<
      ConsumptionModel[],
      {
        tariffId: string;
        period: ConsumptionPeriod;
        timezone?: string;
      }
    >({
      keepUnusedDataFor: 0,
      query: ({ tariffId, period, timezone }) => ({
        url: `/${tariffId}/consumption/${period}`,
        method: 'GET',
        params: { timezone },
      }),
      transformResponse: (consumptionData: ConsumptionDto[]) =>
        consumptionData.map((consumption) =>
          consumptionNormalizer(consumption)
        ),
    }),
    getConsumptionStats: builder.query<
      ConsumptionStatsModel,
      {
        tariffId: string;
        timezone?: string;
      }
    >({
      keepUnusedDataFor: 0,
      query: ({ tariffId, timezone }) => ({
        url: `/${tariffId}/consumption/stats`,
        method: 'GET',
        params: { timezone },
      }),
      transformResponse: (consumptionStats: ConsumptionStatsDto) =>
        consumptionStatsNormalizer(consumptionStats),
    }),
    deleteTariff: builder.mutation<void, { tariffId: string }>({
      query: ({ tariffId }) => {
        return {
          url: `/${tariffId}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: ['Tariffs'],
    }),
  }),
});

export const {
  useGetTariffsQuery,
  useGetTariffDetailsQuery,
  useGetPriceDataQuery,
  useGetConsumptionDataQuery,
  useLazyGetConsumptionDataQuery,
  useGetConsumptionStatsQuery,
  useDeleteTariffMutation,
} = tariffApi;
