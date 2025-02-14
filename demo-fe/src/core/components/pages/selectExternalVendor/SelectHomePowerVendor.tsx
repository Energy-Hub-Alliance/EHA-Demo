import { useGetConnectHomePowerPathQuery } from '../../../../store/connect/connectApi';
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
import { UnavailableHomePowerManufacturer } from '../../../../store/home-power/enums/UnavailableHomePowerManufacturer';
import { unavailableHomePowerManufacturersToIcons } from '../../shared/mappers/unavailableHomePowerManufacturersToIcons';
import { IconWrapper } from '../../shared/wrappers/IconWrapper';

export const SelectHomePowerVendor = () => {
  const [t] = useTranslation();
  const [selectedVendor, setSelectedVendor] = useState<string>();
  const [isRedirecting, setIsRedirecting] = useState(false);
  const vendors = useAppSelector((state) => state.vendors.vendorsState);

  const MOCK_UNAVAILABLE_VENDORS = [UnavailableHomePowerManufacturer.ENPHASE];

  const { data: redirectUrl } = useGetConnectHomePowerPathQuery(
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

  const availableHomePowerVendors = useMemo(() => {
    return vendors
      .filter((vendor) => vendor.type === 'homePower')
      .map((vendor) => vendorToVendorWithIconMapper(vendor));
  }, [vendors]);

  const UNAVAILABLE_HOME_POWER_VENDORS = MOCK_UNAVAILABLE_VENDORS.map(
    (unavailableVendor) => {
      const Icon = unavailableHomePowerManufacturersToIcons[unavailableVendor];
      return {
        name: unavailableVendor,
        Icon: IconWrapper(Icon),
      } as VendorWithIcon;
    }
  );

  if (isRedirecting) return <Loader />;

  return (
    <>
      <NavigationHeader location="/home-power" />
      <SelectVendorList
        title={t('selectManufacturerTitle')}
        subtitle={t('homePowerManufacturersSubtitle')}
        availableVendors={availableHomePowerVendors ?? []}
        unavailableVendors={UNAVAILABLE_HOME_POWER_VENDORS}
        onClick={(vendorName) => setSelectedVendor(vendorName)}
        onRedirectStart={() => setIsRedirecting(true)}
      />
    </>
  );
};
