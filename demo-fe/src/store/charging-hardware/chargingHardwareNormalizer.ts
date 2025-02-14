import { formatDateTime } from '../util/formatDate';
import { ChargerDto } from './chargingHardwareDto';
import { ChargerModel } from './chargingHardwareModel';

export const chargingHardwareNormalizer = (
  charger: ChargerDto
): ChargerModel => {
  return {
    chargerId: charger.id ?? '',
    userId: charger.userId ?? '',
    chargerName: charger.name ?? '',
    chargerModel: charger.model ?? '',
    vendor: charger.vendor ?? '',
    last_updated: charger.lastUpdated
      ? formatDateTime(charger.lastUpdated)
      : '',
    isOnline: charger.isOnline ?? false,
  };
};
