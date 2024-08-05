export enum PricePeriod {
  TODAY = 'TODAY',
  TOMORROW = 'TOMORROW',
}

export enum ConsumptionPeriod {
  TODAY = 'TODAY',
  WEEK = 'WEEK',
  MONTH = 'MONTH',
}

export const TIMEZONE = Intl.DateTimeFormat().resolvedOptions().timeZone;

export const formatPriceDuration = (startDate: string) => {
  const date = new Date(startDate);
  const startHour = date.getHours();
  const endHour = (startHour + 1) % 24;
  let startPeriod = startHour < 12 ? 'AM' : 'PM';
  let endPeriod = endHour < 12 ? 'AM' : 'PM';

  if (startHour === 12) {
    startPeriod = 'PM';
  }
  if (endHour === 12) {
    endPeriod = 'PM';
  }
  const result = `${startHour % 12 || 12} ${startPeriod} - ${
    endHour % 12 || 12
  } ${endPeriod}`;

  return result;
};
