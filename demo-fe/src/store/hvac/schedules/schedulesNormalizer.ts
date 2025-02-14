import { timeToMinutes } from '../../util/timeToMinutes';
import { days, DayInWeek } from '../enums/dayInWeek';
import { ScheduleByWeekdaysDto, SchedulesDto } from './scheduleDto';
import { ScheduleByWeekdaysModel, SchedulesModel } from './scheduleModel';
import { scheduleByWeekdayNormalizer } from './schedulesByWeekdayNormalizer';

export const defaultValues = {
  mode: undefined,
  startTime: '00:00',
  endTime: '24:00',
  temperature: 0,
};

const scheduleNormalizer = (
  schedule: ScheduleByWeekdaysDto
): ScheduleByWeekdaysModel => {
  return {
    start: schedule.start,
    end: schedule.end,
    mode: schedule.mode ?? undefined,
    temperature: schedule.temperature ?? 0,
  };
};

// ---------------------------------------- SCHEDULES PER ALL DAYS ---------------------------------------- //
export const schedulesNormalizer = (
  scheduleEvents: SchedulesDto
): SchedulesModel => {
  // EDGE CASE 1: Schedule possible to have start on MONDAY, END on FRIDAY - Solution: ADD intervals
  // EDGE CASE 2: Schedule possible to have start on MONDAY 12:00, END on MONDAY NEXT WEEK 11:00 - Solution: ADD intervals

  const manipulatedEvents = scheduleEvents.schedules.reduce(
    (accumulator, currValue) => {
      const isSameDay = currValue.start.day === currValue.end.day;
      const isSameTime =
        timeToMinutes(currValue.end.time) ===
        timeToMinutes(currValue.start.time);
      const isEndTimeLessThenStartTime =
        timeToMinutes(currValue.end.time) < timeToMinutes(currValue.start.time);
      const isWholeWeek =
        isSameDay && (isSameTime || isEndTimeLessThenStartTime);

      if (isSameDay && !isWholeWeek) {
        accumulator.push(scheduleNormalizer(currValue));
      }

      // ------------------------------  Handle EDGE CASE 1  --------------------------------- //

      if (!isSameDay) {
        const indexOfStartDay = days.indexOf(currValue.start.day);
        const indexOfEndDay = days.indexOf(currValue.end.day);
        const differenceBetweenDays = indexOfEndDay - indexOfStartDay;

        // Add first part of the day
        accumulator.push({
          mode: currValue.mode,
          start: {
            day: currValue.start.day,
            time: currValue.start.time,
          },
          end: { day: currValue.start.day, time: defaultValues.endTime },
          temperature: currValue.temperature,
        });

        // Add spillover range
        accumulator.push({
          mode: currValue.mode,
          start: {
            day: currValue.end.day,
            time: defaultValues.startTime,
          },
          end: { day: currValue.end.day, time: currValue.end.time },
          temperature: currValue.temperature,
        });

        // Add schedules in the middle if there are any - case MON - SUN
        if (differenceBetweenDays > 1) {
          for (let i = 1; i < differenceBetweenDays; i++) {
            accumulator.push({
              mode: currValue.mode,
              start: {
                day: days[indexOfStartDay + i],
                time: defaultValues.startTime,
              },
              end: {
                day: days[indexOfStartDay + i],
                time: defaultValues.endTime,
              },
              temperature: currValue.temperature,
            });
          }
        }

        // Add schedules in the middle - case SUN - MON
        if (differenceBetweenDays <= -1) {
          for (let i = 1; i < differenceBetweenDays + 7; i++) {
            const indexOfTheDay =
              indexOfStartDay + i >= 7
                ? indexOfStartDay + i - 7
                : indexOfStartDay + i;
            accumulator.push({
              mode: currValue.mode,
              start: {
                day: days[indexOfTheDay],
                time: defaultValues.startTime,
              },
              end: { day: days[indexOfTheDay], time: defaultValues.endTime },
              temperature: currValue.temperature,
            });
          }
        }
      }
      // ------------------------------  Handle EDGE CASE 2  --------------------------------- //

      // Add schedules in the middle - case MON - MON (next week)
      if (isWholeWeek) {
        if (isSameTime) {
          // Add Whole day
          accumulator.push({
            mode: currValue.mode,
            start: {
              day: currValue.start.day,
              time: defaultValues.startTime,
            },
            end: { day: currValue.end.day, time: defaultValues.endTime },
            temperature: currValue.temperature,
          });
        } else {
          // Add first part of the day
          accumulator.push({
            mode: currValue.mode,
            start: {
              day: currValue.start.day,
              time: currValue.start.time,
            },
            end: { day: currValue.start.day, time: defaultValues.endTime },
            temperature: currValue.temperature,
          });
          // Add spillover range
          accumulator.push({
            mode: currValue.mode,
            start: {
              day: currValue.end.day,
              time: defaultValues.startTime,
            },
            end: { day: currValue.end.day, time: currValue.end.time },
            temperature: currValue.temperature,
          });
        }
        // Add all in the middle day
        days.map((day) => {
          if (currValue.start.day !== day) {
            accumulator.push({
              mode: currValue.mode,
              start: {
                day: day,
                time: defaultValues.startTime,
              },
              end: { day, time: defaultValues.endTime },
              temperature: currValue.temperature,
            });
          }
        });
      }

      return accumulator;
    },
    [] as ScheduleByWeekdaysModel[]
  );

  // Assign manipulated schedules to EACH DAY (filtered and sorted)
  return {
    timezone: scheduleEvents.timezone ?? '',
    days: days.reduce(
      (accumulatorDays, day) => {
        const dataForDayExist = manipulatedEvents.some(
          (schedule) => schedule.start.day === day
        );

        accumulatorDays[day] = dataForDayExist
          ? scheduleByWeekdayNormalizer(
              manipulatedEvents
                .filter(
                  (schedule) =>
                    schedule.start.day === day && schedule.end.day === day
                )
                .sort(
                  (firstValue, secondValue) =>
                    timeToMinutes(firstValue.start.time) -
                    timeToMinutes(secondValue.start.time)
                )
            )
          : [
              {
                mode: defaultValues.mode,
                start: { day: day, time: defaultValues.startTime },
                end: { day: day, time: defaultValues.endTime },
                temperature: defaultValues.temperature,
              } as ScheduleByWeekdaysModel,
            ];

        return accumulatorDays;
      },
      {} as Record<DayInWeek, ScheduleByWeekdaysModel[]>
    ),
  };
};
