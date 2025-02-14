import { ChargingHardwareExternalDto } from './chargingHardwareExternalDto';
import { ChargingHardwareExternalModel } from './chargingHardwareExternalModel';

export const chargingHardwareExternalNormalizer = (
  chargerExternal: ChargingHardwareExternalDto
): ChargingHardwareExternalModel => {
  return {
    externalId: chargerExternal.externalId ?? '',
    id: chargerExternal.id ?? '',
    chargerName: chargerExternal.name ?? '',
    model: chargerExternal.model ?? '',
    isLinked: chargerExternal.isLinked,
    manufacturer: chargerExternal.vendor ?? '',
  };
};
