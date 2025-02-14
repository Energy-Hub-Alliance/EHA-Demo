import { Header } from '../../shared/header/Header';
import { useMemo } from 'react';
import { Loader } from '../../shared/loader/Loader';
import { ErrorPage } from '../errorPage/ErrorPage';
import { useLocation } from 'react-router-dom';
import { skipToken } from '@reduxjs/toolkit/query';
import { useGetVendorAccountHvacsQuery } from '../../../../store/link/linkApi';
import { LinkedHvacs } from './LinkedHvacs';
import { SelectHvacsForm } from './SelectHvacsForm';

import { NoHvacs } from './NoHvacs';
import { useHandleLoginCanceled } from '../../../hooks/useHandleLoginCanceled';

export const SelectHvacsPage = () => {
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const vendorAccountId = queryParams.get('vendorAccount');
  const errorParam = queryParams.get('error');
  useHandleLoginCanceled(errorParam);

  const {
    data: hvacs,
    isLoading,
    isError,
  } = useGetVendorAccountHvacsQuery(vendorAccountId ?? skipToken);

  const receivedHvacs = useMemo(() => {
    return hvacs?.hvacs.map((hvac) => hvac);
  }, [hvacs?.hvacs]);

  if (isLoading) return <Loader />;
  if (isError) return <ErrorPage />;
  return receivedHvacs && vendorAccountId ? (
    <>
      <Header />
      {receivedHvacs.length > 0 &&
        (Object.values(receivedHvacs).every((item) => item.linked === true) ? (
          <LinkedHvacs hvacs={receivedHvacs} />
        ) : (
          <SelectHvacsForm
            vendorAccountId={vendorAccountId}
            hvacs={receivedHvacs}
          />
        ))}
      {receivedHvacs.length === 0 && <NoHvacs />}
    </>
  ) : null;
};
