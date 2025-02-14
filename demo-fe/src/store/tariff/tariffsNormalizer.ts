import { formatDateTime } from '../util/formatDate';
import { TariffDto } from './tariffsDto';
import { TariffModel } from './tariffsModel';

export const tariffsNormalizer = (tariff: TariffDto): TariffModel => {
  return {
    tariffId: tariff.id ?? '',
    userId: tariff.userId ?? '',
    tariffName: tariff.name ?? '',
    last_updated: tariff.lastUpdated ? formatDateTime(tariff.lastUpdated) : '',
    isOnline: tariff.isOnline ?? false,
    vendor: tariff.vendor,
  };
};
