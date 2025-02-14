import { Header } from '../../shared/header/Header';
import { useMemo } from 'react';
import { Loader } from '../../shared/loader/Loader';
import { ErrorPage } from '../errorPage/ErrorPage';
import { useLocation } from 'react-router-dom';
import { useGetVendorAccountVehiclesQuery } from '../../../../store/link/linkApi';
import { LinkedVehicles } from './LinkedVehicles';
import { SelectVehiclesForm } from './SelectVehiclesForm';
import { NoVehicles } from './NoVehicles';
import { useHandleLoginCanceled } from '../../../hooks/useHandleLoginCanceled';
import { skipToken } from '@reduxjs/toolkit/query';

export const SelectVehiclesPage = () => {
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const vendorAccountId = queryParams.get('vendorAccount');
  const errorParam = queryParams.get('error');
  useHandleLoginCanceled(errorParam);

  const {
    data: vehicles,
    isLoading,
    isError,
  } = useGetVendorAccountVehiclesQuery(vendorAccountId ?? skipToken);

  const receivedVehicles = useMemo(() => {
    return vehicles?.vehicles.map((vehicle) => vehicle);
  }, [vehicles?.vehicles]);

  if (isLoading) return <Loader />;
  if (isError) return <ErrorPage />;
  return receivedVehicles && vendorAccountId ? (
    <>
      <Header />
      {receivedVehicles.length > 0 &&
        (Object.values(receivedVehicles).every(
          (item) => item.linked === true
        ) ? (
          <LinkedVehicles vehicles={receivedVehicles} />
        ) : (
          <SelectVehiclesForm
            vendorAccountId={vendorAccountId}
            vehicles={receivedVehicles}
          />
        ))}
      {receivedVehicles.length === 0 && <NoVehicles />}
    </>
  ) : null;
};
