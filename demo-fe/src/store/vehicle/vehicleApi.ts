import { createApi } from '@reduxjs/toolkit/query/react';
import { createBaseQuery } from '../baseQuery';
import { VehiclePageModel } from './vehiclesModel';
import { VehicleDto } from './vehicleDto';
import { vehicleNormalizer } from './vehicleNormalizer';
import { VehicleModel } from './vehicleModel';
import { vehiclesNormalizer } from './vehiclesNormalizer';
import { VehiclePageEntry, VehiclesDto } from './vehiclesDto';
import { environment } from '../../environment';

export const vehicleApi = createApi({
  reducerPath: 'vehicleApi',
  tagTypes: ['Vendors'],
  baseQuery: createBaseQuery(`${environment.demoAppServiceUrl}/vehicles`),
  endpoints: (builder) => ({
    getVehicles: builder.query<VehiclePageModel, void>({
      query: () => '',
      transformResponse: (vehicleResponse: VehiclePageEntry) => {
        return {
          totalElements: vehicleResponse.totalElements,
          totalPages: vehicleResponse.totalPages,
          vehicles: vehicleResponse.content.map((vehicle: VehiclesDto) =>
            vehiclesNormalizer(vehicle)
          ),
        };
      },
    }),
    getVehicleDetails: builder.query<VehicleModel, string>({
      keepUnusedDataFor: 0,
      query: (vehicleId) => `/${vehicleId}`,
      transformResponse: (vehicleDetailsResponse: VehicleDto) =>
        vehicleNormalizer(vehicleDetailsResponse),
    }),
    getRefreshedVehicleDetails: builder.query<VehicleModel, string>({
      keepUnusedDataFor: 0,
      query: (vehicleId) => `/${vehicleId}/force-refresh`,
      transformResponse: (vehicleDetailsResponse: VehicleDto) =>
        vehicleNormalizer(vehicleDetailsResponse),
    }),
    getVehicleImage: builder.query<string, string>({
      query: (vehicleId) => ({
        url: `/${vehicleId}/image.png`,
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
  }),
});

export const {
  useGetVehiclesQuery,
  useGetVehicleDetailsQuery,
  useLazyGetRefreshedVehicleDetailsQuery,
  useGetVehicleImageQuery,
} = vehicleApi;
