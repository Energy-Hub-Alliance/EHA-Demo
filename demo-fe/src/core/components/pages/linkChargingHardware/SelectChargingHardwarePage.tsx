import { Header } from '../../shared/header/Header';
import { useMemo } from 'react';
import { Loader } from '../../shared/loader/Loader';
import { ErrorPage } from '../errorPage/ErrorPage';
import { useLocation } from 'react-router-dom';
import { skipToken } from '@reduxjs/toolkit/query';
import { useGetVendorAccountChargerQuery } from '../../../../store/link/linkApi';

import { useHandleLoginCanceled } from '../../../hooks/useHandleLoginCanceled';
import { LinkedChargingHardware } from './LinkedChargingHardware';
import { SelectChargingHardwareForm } from './SelectChargingHardwareForm';
import { NoChargers } from './NoChargingHardware';

export const SelectChargingHardwarePage = () => {
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const vendorAccountId = queryParams.get('vendorAccount');
  const errorParam = queryParams.get('error');
  useHandleLoginCanceled(errorParam);

  const {
    data: chargers,
    isLoading,
    isError,
  } = useGetVendorAccountChargerQuery(vendorAccountId ?? skipToken);

  const receivedChargers = useMemo(() => {
    return chargers?.content.map((charger) => charger);
  }, [chargers?.content]);

  if (isLoading) return <Loader />;
  if (isError) return <ErrorPage />;
  return receivedChargers && vendorAccountId ? (
    <>
      <Header />
      {receivedChargers.length > 0 &&
        (Object.values(receivedChargers).every(
          (item) => item.isLinked === true
        ) ? (
          <LinkedChargingHardware chargers={receivedChargers} />
        ) : (
          <SelectChargingHardwareForm
            vendorAccountId={vendorAccountId}
            chargers={receivedChargers}
          />
        ))}
      {receivedChargers.length === 0 && <NoChargers />}
    </>
  ) : null;
};
