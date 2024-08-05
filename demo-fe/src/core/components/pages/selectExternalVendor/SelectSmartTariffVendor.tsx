import {
  SmartTarrifManufacturer,
  smartTariffManufacturersToIcons,
} from '../../shared/mappers/smartTariffManufacturersToIcons';
import {
  useGetAvailableVendorsQuery,
  useGetConnectTariffsPathQuery,
} from '../../../../store/connect/connectApi';
import { Loader } from '../../shared/loader/Loader';
import { SelectVendorList, Vendor } from './SelectVendorList';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { NavigationHeader } from '../../shared/header/NavigationHeader';

export const SelectSmartTariffVendor = () => {
  const [t] = useTranslation();
  const [selectedVendor, setSelectedVendor] = useState<string>();
  const [isRedirecting, setIsRedirecting] = useState(false);

  const { data: availableVendors, isLoading: isLoadingVendors } =
    useGetAvailableVendorsQuery();
  const MOCK_UNAVAILABLE_VENDORS = ['OCTOPUS', 'EON'];

  const { data: redirectUrl } = useGetConnectTariffsPathQuery(
    { vendor: selectedVendor },
    { skip: !selectedVendor }
  );

  useEffect(() => {
    if (redirectUrl?.url) {
      setIsRedirecting(true);
      window.location.href = redirectUrl.url;
    }
  }, [redirectUrl]);

  const availableSmartTariffVendors = availableVendors?.smartEnergy?.map(
    (availableVendor) => {
      const Icon = <img height={24} src={availableVendor.logoUrl} />;
      return { name: availableVendor.id, Icon } as Vendor;
    }
  );

  const UNAVAILABLE_SMART_TARIFF_VENDORS = MOCK_UNAVAILABLE_VENDORS.map(
    (unavailableVendor) => {
      const Icon =
        smartTariffManufacturersToIcons[
          unavailableVendor as SmartTarrifManufacturer
        ];
      return { name: unavailableVendor, Icon: <Icon /> } as Vendor;
    }
  );

  if (isLoadingVendors || isRedirecting) return <Loader />;

  return (
    <>
      <NavigationHeader location="/smart-tariffs" />
      <SelectVendorList
        title={t('smartTariffManufacturersTitle')}
        subtitle={t('smartTariffManufacturersSubtitle')}
        availableVendors={availableSmartTariffVendors ?? []}
        unavailableVendors={UNAVAILABLE_SMART_TARIFF_VENDORS}
        onClick={(vendorName) => setSelectedVendor(vendorName)}
      />
    </>
  );
};
