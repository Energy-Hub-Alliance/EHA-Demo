import { formatDateTime } from '../../util/formatDate';
import { TariffDetailDto } from './tariffDto';
import { TariffDetailModel } from './tariffModel';

export const tariffDetailNormalizer = (
  tariff: TariffDetailDto
): TariffDetailModel => {
  return {
    tariffId: tariff.id ?? '',
    userId: tariff.userId ?? '',
    locationId: tariff.locationId ?? '',
    isOnline: tariff.isOnline ?? false,
    staticData: {
      currency: tariff.staticData.currency ?? '',
      countryCode: tariff.staticData.countryCode ?? '',
      last_updated: tariff.staticData.lastUpdated
        ? formatDateTime(tariff.staticData.lastUpdated)
        : '',
      vendor: tariff.staticData.vendor,
      tariffName: tariff.staticData.name ?? '',
    },
  };
};
