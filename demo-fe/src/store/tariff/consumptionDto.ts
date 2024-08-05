export interface ConsumptionDto {
  startDate: string;
  endDate: string;
  consumption: number;
}

export interface ConsumptionStatsDto {
  today: number;
  yesterday: number;
  lastMonth: number;
}
