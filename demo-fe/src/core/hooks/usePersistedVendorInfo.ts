import { useMemo } from 'react';
import { useAppSelector } from '../../store/store';
import {
  vendorToVendorWithIconMapper,
  VendorWithIcon,
} from '../components/shared/mappers/vendorToVendorWithIconMapper';

export const usePersistedVendorInfo = (manufacturer: string | undefined) => {
  const vendors = useAppSelector((state) => state.vendors.vendorsState);

  const vendorInfo = useMemo(() => {
    const foundVendor = vendors.filter((vendor) => {
      return vendor.id === manufacturer;
    })[0];
    return manufacturer && foundVendor
      ? vendorToVendorWithIconMapper(foundVendor)
      : ({} as VendorWithIcon);
  }, [manufacturer, vendors]);
  return vendorInfo;
};
