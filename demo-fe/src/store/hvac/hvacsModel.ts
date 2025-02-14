import { HvacType } from './enums/hvacTypeEnum';

export interface HvacModel {
  hvacId: string;
  userId: string;
  hvacName: string;
  hvacType: HvacType;
  model: string;
  vendor: string;
  last_updated: string;
  isOnline: boolean;
}

export interface HvacPageModel {
  hvacs: HvacModel[];
  totalElements: number;
  totalPages: number;
}
