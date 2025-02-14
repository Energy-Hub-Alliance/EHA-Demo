import { formatDateTime } from '../../util/formatDate';
import { BatteryStateEnum } from '../enums/batteryStateEnum';
import { BatteryDto } from './batteryDto';
import { BatteryModel } from './batteryModel';

export const batteryNormalizer = (battery: BatteryDto): BatteryModel => {
  return {
    batteryId: battery.id ?? '',
    userId: battery.userId ?? '',
    batteryName: battery.name ?? '',
    siteName: battery.siteName ?? '',
    model: battery.model ?? '',
    vendor: battery.vendor ?? '',
    last_updated: battery.lastUpdated
      ? formatDateTime(battery.lastUpdated)
      : '',
    isOnline: battery.isOnline ?? false,
    state: battery.state
      ? (battery.state.toUpperCase() as BatteryStateEnum)
      : null,
  };
};
