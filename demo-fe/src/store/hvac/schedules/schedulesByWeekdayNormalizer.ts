import { timeToMinutes, TOTAL_HOURS_PER_DAY } from '../../util/timeToMinutes';
import { ScheduleByWeekdaysModel } from './scheduleModel';
import { defaultValues } from './schedulesNormalizer';

export const getTotalHoursPerWeekday = (
  schedules: ScheduleByWeekdaysModel[]
) => {
  return schedules.reduce((sum, schedules) => {
    return (
      sum +
      Math.abs(
        timeToMinutes(schedules.end.time) - timeToMinutes(schedules.start.time)
      )
    );
  }, 0);
};

// ---------------------------------------- SCHEDULES PER EACH DAY ---------------------------------------- //
export const scheduleByWeekdayNormalizer = (
  schedules: ScheduleByWeekdaysModel[]
) => {
  // EDGE CASE 3: Schedule possible to have empty intervals 00:00 - 12:00 and 13:00 - 24:00 (with missing 12:00-13:00)

  const manipulatedDailySchedules = schedules.reduce(
    (accumulator, currValue, index) => {
      const schedulesTotalHours = getTotalHoursPerWeekday(schedules);
      if (schedulesTotalHours < TOTAL_HOURS_PER_DAY) {
        if (index === 0 && currValue.start.time !== defaultValues.startTime) {
          // Handle empty interval if it is on the beggining of a day
          accumulator.push({
            mode: defaultValues.mode,
            start: {
              day: currValue.start.day,
              time: defaultValues.startTime,
            },
            end: { day: currValue.end.day, time: currValue.start.time },
            temperature: defaultValues.temperature,
          });
        }

        if (
          index === schedules.length - 1 &&
          currValue.end.time !== defaultValues.endTime
        ) {
          // Handle empty interval if it is on the end of a day

          accumulator.push({
            mode: defaultValues.mode,
            start: {
              day: currValue.end.day,
              time: currValue.end.time,
            },
            end: { day: currValue.end.day, time: defaultValues.endTime },
            temperature: defaultValues.temperature,
          });
        }

        if (index > 0) {
          const previousSchedule = schedules[index - 1];
          // Handle empty ranges in the middle
          if (currValue.start.time !== previousSchedule.end.time) {
            accumulator.push({
              mode: defaultValues.mode,
              start: {
                day: previousSchedule.end.day,
                time: previousSchedule.end.time,
              },
              end: { day: currValue.end.day, time: currValue.start.time },
              temperature: defaultValues.temperature,
            });
          }
        }
      }
      accumulator.push(currValue);

      return accumulator.sort(
        (firstValue, secondValue) =>
          timeToMinutes(firstValue.start.time) -
          timeToMinutes(secondValue.start.time)
      );
    },
    [] as ScheduleByWeekdaysModel[]
  );

  return manipulatedDailySchedules ? manipulatedDailySchedules : [];
};
