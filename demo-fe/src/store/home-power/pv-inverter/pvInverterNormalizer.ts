import { formatDateTime } from '../../util/formatDate';
import { PvInverterDto } from './pvInverterDto';
import { PvInverterModel } from './pvInverterModel';

export const pvInverterNormalizer = (
  pvInverter: PvInverterDto
): PvInverterModel => {
  return {
    pvInverterId: pvInverter.id ?? '',
    userId: pvInverter.userId ?? '',
    pvInverterName: pvInverter.name ?? '',
    siteName: pvInverter.siteName ?? '',
    model: pvInverter.model ?? '',
    vendor: pvInverter.vendor ?? '',
    last_updated: pvInverter.lastUpdated
      ? formatDateTime(pvInverter.lastUpdated)
      : '',
    isOnline: pvInverter.isOnline ?? false,
  };
};
