import { HvacType } from '../hvac/enums/hvacTypeEnum';

export interface HvacExternalModel {
  externalId: string;
  id: string;
  hvacName: string;
  model: string;
  hvacType: HvacType;
  linked: boolean;
  manufacturer: string;
}

export interface HvacExternalPageModel {
  hvacs: HvacExternalModel[];
  totalElements: number;
  totalPages: number;
}
