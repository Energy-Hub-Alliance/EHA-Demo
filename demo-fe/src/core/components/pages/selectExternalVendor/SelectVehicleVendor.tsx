import { useGetConnectVehiclePathQuery } from '../../../../store/connect/connectApi';
import { SelectVendorList } from './SelectVendorList';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { NavigationHeader } from '../../shared/header/NavigationHeader';
import { useAppSelector } from '../../../../store/store';
import {
  vendorToVendorWithIconMapper,
  VendorWithIcon,
} from '../../shared/mappers/vendorToVendorWithIconMapper';
import { Loader } from '../../shared/loader/Loader';

export const SelectVehicleVendor = () => {
  const [t] = useTranslation();

  const [selectedVendor, setSelectedVendor] = useState<string>();
  const [isRedirecting, setIsRedirecting] = useState(false);

  const vendors = useAppSelector((state) => state.vendors.vendorsState);

  const availableVehicleVendors = useMemo(() => {
    return vendors
      .filter((vendor) => vendor.type === 'vehicles')
      .map((vendor) => vendorToVendorWithIconMapper(vendor));
  }, [vendors]);

  const UNAVAILABLE_VEHICLE_VENDORS = [] as VendorWithIcon[];

  const { data: redirectUrl } = useGetConnectVehiclePathQuery(
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

  if (isRedirecting) return <Loader />;

  return (
    <>
      <NavigationHeader location="/vehicles" />
      <SelectVendorList
        title={t('vehicleManufacturersTitle')}
        subtitle={t('vehicleManufacturersSubtitle')}
        availableVendors={availableVehicleVendors ?? []}
        unavailableVendors={UNAVAILABLE_VEHICLE_VENDORS}
        onClick={(vendorName) => setSelectedVendor(vendorName)}
        displayName
        onRedirectStart={() => setIsRedirecting(true)}
      />
    </>
  );
};
