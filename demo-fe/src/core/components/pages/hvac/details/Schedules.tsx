import { skipToken } from '@reduxjs/toolkit/query';
import { useGetSchedulesQuery } from '../../../../../store/hvac/hvacApi';
import { Typography, useTheme } from '@mui/material';
import { days } from '../../../../../store/hvac/enums/dayInWeek';
import { useTranslation } from 'react-i18next';
import { ScheduleCard } from './ScheduleCard';

interface SchedulesProps {
  hvacId: string | undefined;
}

export const Schedules = ({ hvacId }: SchedulesProps) => {
  const { data: schedules } = useGetSchedulesQuery(hvacId ?? skipToken);
  const { t } = useTranslation();
  const { ui_vars } = useTheme();

  return schedules ? (
    <>
      <Typography
        fontWeight={700}
        fontSize={ui_vars.font_size.m}
        lineHeight={'2.4rem'}
      >
        {t('schedules')}
      </Typography>

      {days.map((day) => (
        <ScheduleCard
          key={day}
          dayInWeek={day}
          schedule={schedules.days[day]}
        />
      ))}
    </>
  ) : null;
};
