import { Header } from '../../shared/header/Header';
import { Loader } from '../../shared/loader/Loader';
import { ErrorPage } from '../errorPage/ErrorPage';
import { useLocation } from 'react-router-dom';
import { LinkedHomePower } from './LinkedHomePower';
import { SelectHomePowerForm } from './SelectHomePowerForm';
import { NoHomePower } from './NoHomePower';
import { useVendorAccountHomePowerMerged } from '../../../../store/home-power/useVendorAccountHomePowerMerged';
import { useHandleLoginCanceled } from '../../../hooks/useHandleLoginCanceled';

export const SelectHomePowerPage = () => {
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const vendorAccountId = queryParams.get('vendorAccount');
  const errorParam = queryParams.get('error');
  useHandleLoginCanceled(errorParam);

  const {
    data: vendorAccountHomePower,
    isLoading,
    isError,
  } = useVendorAccountHomePowerMerged();

  if (isLoading) return <Loader />;
  if (isError) return <ErrorPage />;

  return vendorAccountHomePower && vendorAccountId ? (
    <>
      <Header />
      {vendorAccountHomePower.length > 0 &&
        vendorAccountId &&
        (Object.values(vendorAccountHomePower).every(
          (item) => item.linked === true
        ) ? (
          <LinkedHomePower homePower={vendorAccountHomePower} />
        ) : (
          <SelectHomePowerForm
            vendorAccountId={vendorAccountId}
            homePower={vendorAccountHomePower}
          />
        ))}
      {vendorAccountHomePower.length === 0 && <NoHomePower />}
    </>
  ) : null;
};
