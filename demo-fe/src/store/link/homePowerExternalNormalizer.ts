import { HomePowerExternalDto } from './homePowerExternalDto';
import { HomePowerExternalModel } from './homePowerExternalModel';

export const homePowerExternalNormalizer = (
  homePowerExternal: HomePowerExternalDto
): HomePowerExternalModel => {
  return {
    externalId: homePowerExternal.externalId ?? '',
    id: homePowerExternal.id ?? '',
    homePowerName: homePowerExternal.name ?? '',
    model: homePowerExternal.model ?? '',
    linked: homePowerExternal.isLinked,
    manufacturer: homePowerExternal.vendor ?? '',
    siteName: homePowerExternal.siteName ?? '',
  };
};
