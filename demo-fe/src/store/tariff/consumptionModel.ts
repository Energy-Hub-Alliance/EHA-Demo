export interface ConsumptionModel {
  start_date: string;
  end_date: string;
  consumption: number;
}

export interface ConsumptionStatsModel {
  today: number;
  yesterday: number;
  lastMonth: number;
}
