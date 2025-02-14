import { HvacType } from '../hvac/enums/hvacTypeEnum';

export interface HvacExternalDto {
  externalId: string;
  id: string;
  name: string;
  model: string;
  type: HvacType;
  isLinked: boolean;
  vendor: string;
}

export interface HvacExternalPageEntry {
  content: HvacExternalDto[];
  totalElements: number;
  totalPages: number;
}
