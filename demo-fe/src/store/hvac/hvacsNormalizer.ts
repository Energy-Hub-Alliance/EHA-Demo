import { formatDateTime } from '../util/formatDate';
import { HvacDto } from './hvacsDto';
import { HvacModel } from './hvacsModel';

export const hvacsNormalizer = (hvac: HvacDto): HvacModel => {
  return {
    hvacId: hvac.id ?? '',
    userId: hvac.userId ?? '',
    hvacName: hvac.name ?? '',
    hvacType: hvac.type,
    model: hvac.model ?? '',
    vendor: hvac.vendor ?? '',
    last_updated: hvac.lastUpdated ? formatDateTime(hvac.lastUpdated) : '',
    isOnline: hvac.isOnline ?? false,
  };
};
