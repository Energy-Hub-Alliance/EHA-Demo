import { formatDateTime } from '../../util/formatDate';
import { MeterDto } from './meterDto';
import { MeterModel } from './meterModel';

export const meterNormalizer = (meter: MeterDto): MeterModel => {
  return {
    meterId: meter.id ?? '',
    userId: meter.userId ?? '',
    meterName: meter.name ?? '',
    siteName: meter.siteName ?? '',
    model: meter.model ?? '',
    vendor: meter.vendor ?? '',
    last_updated: meter.lastUpdated ? formatDateTime(meter.lastUpdated) : '',
    isOnline: meter.isOnline ?? false,
  };
};
