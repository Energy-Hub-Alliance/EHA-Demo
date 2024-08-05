import { ConsumptionDto, ConsumptionStatsDto } from './consumptionDto';
import { ConsumptionModel, ConsumptionStatsModel } from './consumptionModel';

export const consumptionNormalizer = (
  consumption: ConsumptionDto
): ConsumptionModel => {
  return {
    start_date: consumption.startDate ?? '',
    end_date: consumption.endDate ?? '',
    consumption: consumption.consumption ?? 0,
  };
};

export const consumptionStatsNormalizer = (
  consumptionStats: ConsumptionStatsDto
): ConsumptionStatsModel => {
  return {
    today: consumptionStats.today ?? 0,
    yesterday: consumptionStats.yesterday ?? 0,
    lastMonth: consumptionStats.lastMonth ?? 0,
  };
};
