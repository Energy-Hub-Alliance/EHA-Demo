import { createApi } from '@reduxjs/toolkit/query/react';
import { createBaseQuery } from '../baseQuery';
import { VehiclesPageModel } from './vehiclesModel';
import { VehicleDetailDto } from './details/vehicleDto';
import { VehicleDetailModel } from './details/vehicleModel';
import { VehicleDto, VehiclesPageEntry } from './vehiclesDto';
import { environment } from '../../environment';
import { vehiclesNormalizer } from './vehiclesNormalizer';
import { vehicleDetailNormalizer } from './details/vehicleNormalizer';
import { VehicleCommandModel } from './vehicleCommandModel';

export const vehicleApi = createApi({
  reducerPath: 'vehicleApi',
  tagTypes: ['Vehicles'],
  baseQuery: createBaseQuery(`${environment.demoAppServiceUrl}/vehicles`),
  endpoints: (builder) => ({
    getVehicles: builder.query<VehiclesPageModel, void>({
      query: () => '',
      transformResponse: (vehicleResponse: VehiclesPageEntry) => {
        return {
          totalElements: vehicleResponse.totalElements,
          totalPages: vehicleResponse.totalPages,
          vehicles: vehicleResponse.content.map((vehicle: VehicleDto) =>
            vehiclesNormalizer(vehicle)
          ),
        };
      },
      providesTags: ['Vehicles'],
    }),
    getVehicleDetails: builder.query<VehicleDetailModel, string>({
      keepUnusedDataFor: 0,
      query: (vehicleId) => `/${vehicleId}`,
      transformResponse: (vehicleDetailsResponse: VehicleDetailDto) =>
        vehicleDetailNormalizer(vehicleDetailsResponse),
    }),
    getRefreshedVehicleDetails: builder.query<VehicleDetailModel, string>({
      keepUnusedDataFor: 0,
      query: (vehicleId) => `/${vehicleId}/force-refresh`,
      transformResponse: (vehicleDetailsResponse: VehicleDetailDto) =>
        vehicleDetailNormalizer(vehicleDetailsResponse),
      providesTags: ['Vehicles'],
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
    deleteVehicle: builder.mutation<void, { vehicleId: string }>({
      query: ({ vehicleId }) => {
        return {
          url: `/${vehicleId}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: ['Vehicles'],
    }),

    startVehicleChargeCommand: builder.mutation<void, { vehicleId: string }>({
      query: ({ vehicleId }) => {
        return {
          url: `/${vehicleId}/commands/charging-start`,
          method: 'POST',
        };
      },
      invalidatesTags: ['Vehicles'],
    }),

    stopVehicleChargeCommand: builder.mutation<void, { vehicleId: string }>({
      query: ({ vehicleId }) => {
        return {
          url: `/${vehicleId}/commands/charging-stop`,
          method: 'POST',
        };
      },
      invalidatesTags: ['Vehicles'],
    }),

    getVehicleCommands: builder.query<VehicleCommandModel[], string>({
      keepUnusedDataFor: 0,
      query: (vehicleId) => `/${vehicleId}/commands`,
    }),
  }),
});

export const {
  useGetVehiclesQuery,
  useGetVehicleDetailsQuery,
  useLazyGetRefreshedVehicleDetailsQuery,
  useGetVehicleImageQuery,
  useDeleteVehicleMutation,
  useGetVehicleCommandsQuery,
  useStartVehicleChargeCommandMutation,
  useStopVehicleChargeCommandMutation,
} = vehicleApi;
