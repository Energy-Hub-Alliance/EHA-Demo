import { createApi } from '@reduxjs/toolkit/query/react';
import { createBaseQuery } from '../baseQuery';
import { environment } from '../../environment';
import { HvacPageModel } from './hvacsModel';
import { HvacDto, HvacPageEntry } from './hvacsDto';
import { hvacsNormalizer } from './hvacsNormalizer';
import { SchedulesModel } from './schedules/scheduleModel';
import { SchedulesDto } from './schedules/scheduleDto';
import { schedulesNormalizer } from './schedules/schedulesNormalizer';
import { HvacDetailsModel } from './details/hvacDetailsModel';
import { HvacDetailsDto } from './details/hvacDetailsDto';
import { hvacDetailsNormalizer } from './details/hvacDetailsNormalizer';

export const hvacApi = createApi({
  reducerPath: 'hvacApi',
  tagTypes: ['Hvacs'],
  baseQuery: createBaseQuery(`${environment.demoAppServiceUrl}/hvacs`),
  endpoints: (builder) => ({
    getHvacs: builder.query<HvacPageModel, void>({
      query: () => '',
      transformResponse: (hvacsResponse: HvacPageEntry) => {
        return {
          totalElements: hvacsResponse.totalElements,
          totalPages: hvacsResponse.totalPages,
          hvacs: hvacsResponse.content.map((hvac: HvacDto) =>
            hvacsNormalizer(hvac)
          ),
        };
      },
      providesTags: ['Hvacs'],
    }),
    getHvacDetails: builder.query<HvacDetailsModel, string>({
      keepUnusedDataFor: 0,
      query: (hvacId) => `/${hvacId}`,
      transformResponse: (hvacDetailsResponse: HvacDetailsDto) =>
        hvacDetailsNormalizer(hvacDetailsResponse),
    }),

    getHvacImage: builder.query<string, string>({
      query: (hvacId) => ({
        url: `/${hvacId}/image.png`,
        responseHandler: async (response) => {
          const blob = await response.blob();
          return new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => {
              const base64String = reader.result as string;
              resolve(base64String);
            };
            reader.onerror = () => {
              reject(new Error('Failed to read image file'));
            };
            reader.readAsDataURL(blob);
          });
        },
      }),
    }),

    getRefreshedHvacDetails: builder.query<HvacDetailsModel, string>({
      keepUnusedDataFor: 0,
      query: (hvacId) => `/${hvacId}/refresh`,
      transformResponse: (hvacDetailsResponse: HvacDetailsDto) =>
        hvacDetailsNormalizer(hvacDetailsResponse),
      providesTags: ['Hvacs'],
    }),

    getSchedules: builder.query<SchedulesModel, string>({
      keepUnusedDataFor: 0,
      query: (hvacId) => `/${hvacId}/schedules`,
      transformResponse: (schedules: SchedulesDto) =>
        schedulesNormalizer(schedules),
    }),

    deleteHvac: builder.mutation<void, { hvacId: string }>({
      query: ({ hvacId }) => {
        return {
          url: `/${hvacId}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: ['Hvacs'],
    }),
  }),
});

export const {
  useGetHvacsQuery,
  useGetHvacDetailsQuery,
  useGetHvacImageQuery,
  useLazyGetRefreshedHvacDetailsQuery,
  useGetSchedulesQuery,
  useDeleteHvacMutation,
} = hvacApi;
