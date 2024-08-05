import { formatDateTime } from '../util/formatDate';
import { TariffDto } from './tariffsDto';
import { TariffModel } from './tariffsModel';

export const tariffsNormalizer = (tariff: TariffDto): TariffModel => {
  return {
    tariffId: tariff.id ?? '',
    userId: tariff.userId ?? '',
    locationId: tariff.locationId ?? '',
    currency: tariff.currency ?? '',
    country: tariff.countryCode ?? '',
    last_updated: formatDateTime(tariff.lastUpdated) ?? '',
    isOnline: tariff.isOnline ?? false,
    vendor: tariff.vendor,
  };
};
