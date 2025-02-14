import { DayInWeek } from '../enums/dayInWeek';
import { HvacMode } from '../enums/hvacModeEnum';

export interface ScheduleDayTimeModel {
  day: DayInWeek;
  time: string;
}

export interface ScheduleByWeekdaysModel {
  start: ScheduleDayTimeModel;
  end: ScheduleDayTimeModel;
  mode: HvacMode | undefined;
  temperature: number;
}

export interface SchedulesModel {
  timezone: string;
  days: {
    [key in DayInWeek]: ScheduleByWeekdaysModel[];
  };
}
