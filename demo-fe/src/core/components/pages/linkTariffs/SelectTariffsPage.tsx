import { Header } from '../../shared/header/Header';
import { useMemo } from 'react';
import { Loader } from '../../shared/loader/Loader';
import { ErrorPage } from '../errorPage/ErrorPage';
import { useLocation } from 'react-router-dom';
import { useGetVendorAccountTariffsQuery } from '../../../../store/link/linkApi';
import { LinkedTariffs } from './LinkedTariffs';
import { SelectTariffsForm } from './SelectTariffsForm';
import { NoTariffs } from './NoTariffs';
import { useHandleLoginCanceled } from '../../../hooks/useHandleLoginCanceled';
import { skipToken } from '@reduxjs/toolkit/query';

export const SelectTariffsPage = () => {
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const vendorAccountId = queryParams.get('vendorAccount');
  const errorParam = queryParams.get('error');
  useHandleLoginCanceled(errorParam);

  const {
    data: tariffs,
    isLoading,
    isError,
  } = useGetVendorAccountTariffsQuery(vendorAccountId ?? skipToken);

  const receivedTariffs = useMemo(() => {
    return tariffs?.tariffs.map((tariff) => tariff);
  }, [tariffs?.tariffs]);

  if (isLoading) return <Loader />;
  if (isError) return <ErrorPage />;
  return receivedTariffs && vendorAccountId ? (
    <>
      <Header />
      {receivedTariffs.length > 0 &&
        (Object.values(receivedTariffs).every(
          (item) => item.linked === true
        ) ? (
          <LinkedTariffs tariffs={receivedTariffs} />
        ) : (
          <SelectTariffsForm
            vendorAccountId={vendorAccountId}
            tariffs={receivedTariffs}
          />
        ))}
      {receivedTariffs.length === 0 && <NoTariffs />}
    </>
  ) : null;
};
