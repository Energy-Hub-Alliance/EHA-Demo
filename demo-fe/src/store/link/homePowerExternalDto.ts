export interface HomePowerExternalDto {
  externalId: string;
  id: string;
  name: string;
  model: string;
  isLinked: boolean;
  vendor: string;
  siteName: string;
}

export interface HomePowerExternalPageEntry {
  content: HomePowerExternalDto[];
  totalElements: number;
  totalPages: number;
}
