import { useMemo } from 'react';
import {
  useGetVendorAccountBatteryQuery,
  useGetVendorAccountInverterQuery,
  useGetVendorAccountMeterQuery,
} from '../link/linkApi';
import { useLocation } from 'react-router-dom';
import { skipToken } from '@reduxjs/toolkit/query';
import { HomePowerType } from './enums/homePowerTypeEnum';

export interface HomePowerExternalModelExtended {
  type: HomePowerType;
  externalId: string;
  id: string;
  homePowerName: string;
  model: string;
  linked: boolean;
  manufacturer: string;
  siteName: string;
}

export const useVendorAccountHomePowerMerged = () => {
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const vendorAccountId = queryParams.get('vendorAccount');

  const {
    data: batteries,
    isLoading: isLoadingBatteries,
    isError: isErrorBatteries,
  } = useGetVendorAccountBatteryQuery(vendorAccountId ?? skipToken);

  const {
    data: pvInverters,
    isLoading: isLoadingPvInverters,
    isError: isErrorPvInverters,
  } = useGetVendorAccountInverterQuery(vendorAccountId ?? skipToken);

  const {
    data: meters,
    isLoading: isLoadingMeters,
    isError: isErrorMeters,
  } = useGetVendorAccountMeterQuery(vendorAccountId ?? skipToken);

  const recievedHomePowerVendorAccount = useMemo(() => {
    const transformedBatteries =
      batteries?.homePower.map(
        (battery) =>
          ({
            ...battery,
            type: HomePowerType.BATTERY,
          }) as HomePowerExternalModelExtended
      ) || ([] as HomePowerExternalModelExtended[]);

    const transformedPvInverters =
      pvInverters?.homePower.map(
        (pvInverters) =>
          ({
            ...pvInverters,
            type: HomePowerType.PV_INVERTER,
          }) as HomePowerExternalModelExtended
      ) || ([] as HomePowerExternalModelExtended[]);

    const transformedMeters =
      meters?.homePower.map(
        (meters) =>
          ({
            ...meters,
            type: HomePowerType.METER,
          }) as HomePowerExternalModelExtended
      ) || ([] as HomePowerExternalModelExtended[]);

    return [
      ...transformedBatteries,
      ...transformedPvInverters,
      ...transformedMeters,
    ]; // Adjust the merge logic as needed
  }, [batteries, pvInverters, meters]);

  return {
    data: recievedHomePowerVendorAccount,
    isLoading: isLoadingBatteries || isLoadingPvInverters || isLoadingMeters,
    isError: isErrorBatteries && isErrorPvInverters && isErrorMeters,
  };
};
