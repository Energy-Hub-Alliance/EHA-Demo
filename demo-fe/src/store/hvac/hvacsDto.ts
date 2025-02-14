import { HvacType } from './enums/hvacTypeEnum';

export interface HvacDto {
  id: string;
  userId: string;
  name: string;
  type: HvacType;
  model: string;
  vendor: string;
  lastUpdated: string;
  isOnline: boolean;
}

export interface HvacPageEntry {
  content: HvacDto[];
  totalElements: number;
  totalPages: number;
}
