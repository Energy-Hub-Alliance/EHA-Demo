export interface HomePowerExternalModel {
  externalId: string;
  id: string;
  homePowerName: string;
  model: string;
  linked: boolean;
  manufacturer: string;
  siteName: string;
}

export interface HomePowerExternalPageModel {
  homePower: HomePowerExternalModel[];
  totalElements: number;
  totalPages: number;
}
