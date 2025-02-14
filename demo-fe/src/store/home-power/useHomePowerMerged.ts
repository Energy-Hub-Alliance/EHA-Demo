import { useMemo } from 'react';
import { useGetBatteriesQuery } from './battery/batteryApi';
import { useGetPvInvertersQuery } from './pv-inverter/pvInverterApi';
import { HomePowerType } from './enums/homePowerTypeEnum';
import { useGetMetersQuery } from './meters/meterApi';

export interface HomePowerMerged {
  id: string;
  name: string;
  model: string;
  manufacturer: string;
  type: HomePowerType;
}

export const useHomePowerMerged = () => {
  const {
    data: batteries,
    isLoading: isLoadingBatteries,
    isError: isErrorBatteries,
  } = useGetBatteriesQuery();

  const {
    data: pvInverters,
    isLoading: isLoadingPvInverters,
    isError: isErrorPvInverters,
  } = useGetPvInvertersQuery();

  const {
    data: meters,
    isLoading: isLoadingMeters,
    isError: isErrorMeters,
  } = useGetMetersQuery();

  const recievedHomePower = useMemo(() => {
    const transformedBatteries: HomePowerMerged[] =
      batteries?.batteries.map((battery) => ({
        id: battery.batteryId,
        name: battery.batteryName,
        model: battery.model,
        manufacturer: battery.vendor,
        type: HomePowerType.BATTERY,
      })) || ([] as HomePowerMerged[]);

    const transformedPvInverters: HomePowerMerged[] =
      pvInverters?.pvInverters.map((pvInverters) => ({
        id: pvInverters.pvInverterId,
        name: pvInverters.pvInverterName,
        model: pvInverters.model,
        manufacturer: pvInverters.vendor,
        type: HomePowerType.PV_INVERTER,
      })) || ([] as HomePowerMerged[]);

    const transformedMeters: HomePowerMerged[] =
      meters?.meters.map((meter) => ({
        id: meter.meterId,
        name: meter.meterName,
        model: meter.model,
        manufacturer: meter.vendor,
        type: HomePowerType.METER,
      })) || ([] as HomePowerMerged[]);

    return [
      ...transformedBatteries,
      ...transformedPvInverters,
      ...transformedMeters,
    ]; // Adjust the merge logic as needed
  }, [batteries, pvInverters, meters]);

  return {
    data: recievedHomePower,
    isLoading: isLoadingBatteries || isLoadingPvInverters || isLoadingMeters,
    isError: isErrorBatteries && isErrorPvInverters && isErrorMeters,
  };
};
