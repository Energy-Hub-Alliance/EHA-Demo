import { HvacType } from '../hvac/enums/hvacTypeEnum';
import { HvacExternalDto } from './hvacExternalDto';
import { HvacExternalModel } from './hvacExternalModel';

export const hvacExternalNormalizer = (
  hvacExternal: HvacExternalDto
): HvacExternalModel => {
  return {
    externalId: hvacExternal.externalId ?? '',
    id: hvacExternal.id ?? '',
    hvacName: hvacExternal.name ?? '',
    hvacType: hvacExternal.type ?? HvacType.HEATPUMP,
    model: hvacExternal.model ?? '',
    linked: hvacExternal.isLinked,
    manufacturer: hvacExternal.vendor ?? '',
  };
};
