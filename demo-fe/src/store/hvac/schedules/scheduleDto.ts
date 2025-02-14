import { DayInWeek } from '../enums/dayInWeek';
import { HvacMode } from '../enums/hvacModeEnum';

export interface ScheduleDayTimeDto {
  day: DayInWeek;
  time: string;
}

export interface ScheduleByWeekdaysDto {
  start: ScheduleDayTimeDto;
  end: ScheduleDayTimeDto;
  mode: HvacMode;
  temperature: number;
}

export interface SchedulesDto {
  timezone: string;
  schedules: ScheduleByWeekdaysDto[];
}
