interface MeterDetailsStaticDataDto {
  lastUpdated: string;
  vendor: string;
  model: string;
  name: string;
  siteName: string;
}

interface MeterDetailsStateDto {
  lastUpdated: string;
  power: number;
  meterValue: number;
}

export interface MeterDetailsDto {
  id: string;
  userId: string;
  locationId: string;
  isOnline: boolean;
  lastUpdated: string;
  staticData: MeterDetailsStaticDataDto;
  powerState: MeterDetailsStateDto;
}
