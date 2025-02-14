import { useGetConnectHvacsPathQuery } from '../../../../store/connect/connectApi';
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
import { unavailableHvacManufacturersToIcons } from '../../shared/mappers/unavailableHvacManufacturersToIcons';
import { UnavailableHvacManufacturer } from '../../../../store/hvac/enums/UnavailableHvacManufacturer';

export const SelectHvacVendor = () => {
  const [t] = useTranslation();
  const [selectedVendor, setSelectedVendor] = useState<string>();
  const [isRedirecting, setIsRedirecting] = useState(false);
  const vendors = useAppSelector((state) => state.vendors.vendorsState);

  const MOCK_UNAVAILABLE_VENDORS = [
    UnavailableHvacManufacturer.BOSCH,
    UnavailableHvacManufacturer.STIEBELELTRON,
  ];

  const { data: redirectUrl } = useGetConnectHvacsPathQuery(
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

  const availableHvacVendors = useMemo(() => {
    return vendors
      .filter((vendor) => vendor.type === 'hvac')
      .map((vendor) => vendorToVendorWithIconMapper(vendor));
  }, [vendors]);

  const UNAVAILABLE_HVAC_VENDORS = MOCK_UNAVAILABLE_VENDORS.map(
    (unavailableVendor) => {
      const Icon = unavailableHvacManufacturersToIcons[unavailableVendor];
      return {
        name: unavailableVendor,
        Icon: IconWrapper(Icon),
      } as VendorWithIcon;
    }
  );

  if (isRedirecting) return <Loader />;

  return (
    <>
      <NavigationHeader location="/hvacs" />
      <SelectVendorList
        title={t('hvacManufacturersTitle')}
        subtitle={t('hvacManufacturersSubtitle')}
        availableVendors={availableHvacVendors ?? []}
        unavailableVendors={UNAVAILABLE_HVAC_VENDORS}
        onClick={(vendorName) => setSelectedVendor(vendorName)}
        onRedirectStart={() => setIsRedirecting(true)}
      />
    </>
  );
};
