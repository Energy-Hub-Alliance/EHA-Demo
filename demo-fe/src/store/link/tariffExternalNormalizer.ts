import { TariffExternalDto } from './tariffExternalDto';
import { TariffExternalModel } from './tariffExternalModel';

export const tariffExternalNormalizer = (
  tariffExternal: TariffExternalDto
): TariffExternalModel => {
  return {
    externalId: tariffExternal.externalId ?? '',
    countryCode: tariffExternal.countryCode ?? '',
    tariffName: tariffExternal.tariffName ?? '',
    manufacturer: tariffExternal.vendor ?? '',
    linked: tariffExternal.isLinked ?? '',
  };
};
