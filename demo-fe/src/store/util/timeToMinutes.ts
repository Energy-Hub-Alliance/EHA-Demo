const TOTAL_MINUTES_IN_ONE_HOUR = 60;
export const TOTAL_HOURS_PER_DAY = 60 * 24;

export function timeToMinutes(timeString: string) {
  const [hours, minutes] = timeString.split(':').map(Number);
  return hours * TOTAL_MINUTES_IN_ONE_HOUR + minutes;
}
