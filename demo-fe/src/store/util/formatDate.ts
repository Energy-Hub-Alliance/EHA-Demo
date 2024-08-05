import { addMinutes, format } from 'date-fns';

const DEMO_APP_DATE_FORMAT = 'dd.MM.yyyy';
const DEMO_APP_DATE_TIME_FORMAT_BE = "yyyy-MM-dd'T'HH:mm:ss";

export const formatDateTime = (
  date: string,
  dateTimeFormat = DEMO_APP_DATE_FORMAT
) => format(new Date(date), dateTimeFormat);

export const toPayloadDate = (
  date: Date,
  dateFormat: string = DEMO_APP_DATE_TIME_FORMAT_BE
) => format(addMinutes(date, date.getTimezoneOffset()), dateFormat);

export const appendZToDateString = (
  date: string | null | undefined
): string => {
  if (!date) return '';

  return date.includes('Z') ? date : `${date}Z`;
};
