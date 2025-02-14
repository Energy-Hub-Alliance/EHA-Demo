import { unavailableSmartTariffManufacturersToIcons } from '../../shared/mappers/unavailableSmartTariffManufacturersToIcons';
import { useGetConnectTariffsPathQuery } from '../../../../store/connect/connectApi';
import { Loader } from '../../shared/loader/Loader';
import { SelectVendorList } from './SelectVendorList';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { NavigationHeader } from '../../shared/header/NavigationHeader';
import { useAppSelector } from '../../../../store/store';
import {
  vendorToVendorWithIconMapper,
  VendorWithIcon,
} from '../../shared/mappers/vendorToVendorWithIconMapper';
import { IconWrapper } from '../../shared/wrappers/IconWrapper';
import { UnavailableSmartTariffManufacturer } from '../../../../store/tariff/enums/UnavailableSmartTariffManufacturer';

export const SelectSmartTariffVendor = () => {
  const [t] = useTranslation();
  const [selectedVendor, setSelectedVendor] = useState<string>();
  const [isRedirecting, setIsRedirecting] = useState(false);
  const vendors = useAppSelector((state) => state.vendors.vendorsState);

  const MOCK_UNAVAILABLE_VENDORS = [
    UnavailableSmartTariffManufacturer.OCTOPUS,
    UnavailableSmartTariffManufacturer.EON,
  ];

  const { data: redirectUrl } = useGetConnectTariffsPathQuery(
    { vendor: selectedVendor },
    { skip: !selectedVendor }
  );

  const handleCachedPageRestored = useCallback(() => {
    setSelectedVendor('');
    setIsRedirecting(false);
  }, []);

  useEffect(() => {
    window.addEventListener('pageshow', handleCachedPageRestored);

    return () => {
      window.removeEventListener('pageshow', handleCachedPageRestored);
    };
  }, [handleCachedPageRestored]);

  useEffect(() => {
    if (isRedirecting !== false && redirectUrl?.url) {
      window.location.href = redirectUrl.url;
    }
  }, [isRedirecting, redirectUrl]);

  const availableSmartTariffVendors = useMemo(() => {
    return vendors
      .filter((vendor) => vendor.type === 'tariffs')
      .map((vendor) => vendorToVendorWithIconMapper(vendor));
  }, [vendors]);

  const UNAVAILABLE_SMART_TARIFF_VENDORS = MOCK_UNAVAILABLE_VENDORS.map(
    (unavailableVendor) => {
      const Icon =
        unavailableSmartTariffManufacturersToIcons[unavailableVendor];
      return {
        name: unavailableVendor,
        Icon: IconWrapper(Icon),
      } as VendorWithIcon;
    }
  );

  if (isRedirecting) return <Loader />;

  return (
    <>
      <NavigationHeader location="/smart-tariffs" />
      <SelectVendorList
        title={t('smartTariffManufacturersTitle')}
        subtitle={t('smartTariffManufacturersSubtitle')}
        availableVendors={availableSmartTariffVendors ?? []}
        unavailableVendors={UNAVAILABLE_SMART_TARIFF_VENDORS}
        onClick={(vendorName) => setSelectedVendor(vendorName)}
        onRedirectStart={() => setIsRedirecting(true)}
      />
    </>
  );
};
