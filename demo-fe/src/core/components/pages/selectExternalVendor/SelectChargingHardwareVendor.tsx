import { useGetConnectChargingHardwarePathQuery } from '../../../../store/connect/connectApi';
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

export const SelectChargingHardwareVendor = () => {
  const [t] = useTranslation();
  const [selectedVendor, setSelectedVendor] = useState<string>();
  const [isRedirecting, setIsRedirecting] = useState(false);
  const vendors = useAppSelector((state) => state.vendors.vendorsState);

  const { data: redirectUrl } = useGetConnectChargingHardwarePathQuery(
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

  const availableChargingHardwareVendors = useMemo(() => {
    return vendors
      .filter((vendor) => vendor.type === 'chargers')
      .map((vendor) => vendorToVendorWithIconMapper(vendor));
  }, [vendors]);

  const UNAVAILABLE_CHARGING_HARDWARE_VENDORS = [] as VendorWithIcon[];

  if (isRedirecting) return <Loader />;

  return (
    <>
      <NavigationHeader location="/charging-hardware" />
      <SelectVendorList
        title={t('selectManufacturerTitle')}
        subtitle={t('chargingHardwareManufacturersSubtitle')}
        availableVendors={availableChargingHardwareVendors ?? []}
        unavailableVendors={UNAVAILABLE_CHARGING_HARDWARE_VENDORS}
        onClick={(vendorName) => setSelectedVendor(vendorName)}
        onRedirectStart={() => setIsRedirecting(true)}
      />
    </>
  );
};
