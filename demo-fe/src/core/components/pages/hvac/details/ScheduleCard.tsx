import { Box, Card, Typography, useTheme } from '@mui/material';
import { ScheduleByWeekdaysModel } from '../../../../../store/hvac/schedules/scheduleModel';
import { useTranslation } from 'react-i18next';
import { HvacMode } from '../../../../../store/hvac/enums/hvacModeEnum';
import { hvacModesToIcons } from '../../../shared/mappers/hvacModesToIcons';
import {
  timeToMinutes,
  TOTAL_HOURS_PER_DAY,
} from '../../../../../store/util/timeToMinutes';
import { getTotalHoursPerWeekday } from '../../../../../store/hvac/schedules/schedulesByWeekdayNormalizer';

const hvacModeToColors: Record<HvacMode, string> = {
  OFF: '#FFFFFF',
  HEAT: '#00FF7F',
  REDUCED: '#0083FC',
  AUTO: '#FFC240',
  COOL: '#871FFF',
  DRY: '#FF7E4B',
};

interface ScheduleCardProps {
  dayInWeek: string;
  schedule: ScheduleByWeekdaysModel[];
}

const getTotalMinutesPercentage = (value: number) =>
  (value / TOTAL_HOURS_PER_DAY) * 100;
const formatNumberToString = (value: number) => {
  const hours = value.toString().padStart(2, '0');
  return `${hours}:00`;
};

export const ScheduleCard = ({ dayInWeek, schedule }: ScheduleCardProps) => {
  const { t } = useTranslation();
  const { ui_vars } = useTheme();

  const schedulesOverlaped =
    getTotalHoursPerWeekday(schedule) !== TOTAL_HOURS_PER_DAY;

  const groupedHvacByColor = schedule.map((sch) => {
    return {
      mode: sch.mode,
      timeLength: timeToMinutes(sch.end.time) - timeToMinutes(sch.start.time),
      color: sch.mode ? hvacModeToColors[sch.mode] : 'transparent',
    };
  });

  const schedulesUndefined = groupedHvacByColor.every(
    (sch) => sch.mode === undefined
  );

  return (
    <Card
      sx={{
        width: '100%',
        p: 3,
      }}
    >
      <Typography>{t(`days.${dayInWeek}`)}</Typography>
      <Box
        // -------------------------------------- CUSTOM RULER - TIME AXIS -------------------------------------- //
        sx={{
          mt: 9,
          mb: 3,
          display: 'flex',
          height: '5px',
          width: '100%',
          position: 'relative',
        }}
      >
        {Array.from({ length: 24 }).map((_, index) => {
          const percentage = getTotalMinutesPercentage(60);
          const isVisibleHourNumber = (index + 1) % 6 === 0;
          const isFirst = index === 0;
          const isLast = index === 23;
          return (
            <Box
              key={`${percentage + index}`}
              sx={{
                height: '100%',
                flexShrink: 0,
                width: `${percentage}%`,
                borderLeft: isFirst ? `2px solid white` : 'none', // Left border
                borderRight:
                  isLast || isVisibleHourNumber
                    ? '2px solid white'
                    : '1px solid white', // Right border
                position: 'relative',
              }}
            >
              {isVisibleHourNumber || isFirst || isLast ? (
                <Typography
                  fontSize={ui_vars.font_size.xs}
                  height={16}
                  style={{
                    position: 'absolute',
                    bottom: 2,
                    left: isFirst ? '1rem' : '100%',
                    right: isLast ? '-5rem' : 'auto',
                    transform: 'translate(-50%, -50%)',
                  }}
                >
                  {index === 0
                    ? formatNumberToString(index)
                    : formatNumberToString(index + 1)}
                </Typography>
              ) : null}
            </Box>
          );
        })}
      </Box>
      <Box
        // ---------------------------------- COLORED DATA - BY HVAC MODE ------------------------------------ //
        sx={{
          display: 'flex',
          height: '5px',
          width: '100%',
          position: 'relative',
          mb: 4,
        }}
      >
        {!schedulesOverlaped ? (
          groupedHvacByColor.map((serie, index) => {
            const percentage = getTotalMinutesPercentage(serie.timeLength);
            const SerieImage = serie.mode ? hvacModesToIcons[serie.mode] : null;
            return schedulesUndefined ? null : (
              <Box
                key={`${serie.color + index}`}
                sx={{
                  height: '100%',
                  flexShrink: 0,
                  width: `${percentage}%`,
                  backgroundColor: serie.color,
                  position: 'relative',
                  borderLeft:
                    index === 0 ? '2px solid white' : '1px solid white',
                  borderRight:
                    groupedHvacByColor.length === index + 1
                      ? '2px solid white'
                      : '1px solid white',
                }}
              >
                {SerieImage && (
                  <SerieImage
                    height={16}
                    style={{
                      position: 'absolute',
                      top: 20,
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                    }}
                  />
                )}
              </Box>
            );
          })
        ) : (
          <Typography> {t(`overlapMessage`)}</Typography>
        )}
      </Box>
    </Card>
  );
};
