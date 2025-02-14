import { Box, Card, Typography, useTheme } from '@mui/material';
import BatteryMaskSvg from '../assets/icons/battery-mask.svg';
import { useTranslation } from 'react-i18next';
import { isValueValid } from '../../../../store/util/isValueValid';
import { EMPTY_VALUE_PLACEHOLDER } from './DoubleDetailCard';
import { useEffect } from 'react';

interface BatteryCardProps {
  stateOfCharge?: number;
  chargeLimitMin?: number;
  chargeLimitMax?: number;
  charging: boolean;
}

export const AnimatedBatteryCard = ({
  stateOfCharge,
  chargeLimitMin,
  chargeLimitMax,
  charging,
}: BatteryCardProps) => {
  const { palette, ui_vars } = useTheme();
  const { t } = useTranslation();
  const batteryPercentage = stateOfCharge ? stateOfCharge : 0;
  const speedOfBatteryAnimation = 4 * ((100 - batteryPercentage) / 100);

  const generateKeyframesDinamically = (percentage: number) => `
  @keyframes expand-${percentage} {
    0% {
      width: ${percentage}%;
    }
    100% {
      width: 100%;
    }
  }
`;

  useEffect(() => {
    // MANUAL INSERT AND CLEAN UP of keyframe rules
    // Reasson: Rules are different per percentage of battery
    const styleSheet = document.styleSheets[0];
    const keyframes = generateKeyframesDinamically(batteryPercentage);
    styleSheet.insertRule(keyframes, styleSheet.cssRules.length);

    return () => {
      // CLEAN UP
      const keyframesName = `@keyframes expand-${batteryPercentage}`;
      const rules = styleSheet.cssRules;
      for (let i = rules.length - 1; i >= 0; i--) {
        if (rules[i].cssText.includes(keyframesName)) {
          styleSheet.deleteRule(i);
        }
      }
    };
  }, [batteryPercentage]);

  return (
    <Card
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: ui_vars.other.page_spacing,
        width: '100%',
        py: '2.4rem',
      }}
    >
      {/* -------------------------- Battery percentage -------------------------- */}
      <Typography
        fontWeight={700}
        fontSize={ui_vars.font_size.xxl}
        lineHeight={'4.2rem'}
        color={palette.secondary.main}
      >
        {isValueValid(stateOfCharge)
          ? `${stateOfCharge}%`
          : EMPTY_VALUE_PLACEHOLDER}
      </Typography>

      {/* -------------------------- Battery -------------------------- */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1.5,
        }}
      >
        <Card
          sx={{
            width: '9.5rem',
            height: '7rem',
            py: 3,
          }}
        >
          <Box
            sx={{
              width: '6.4rem',
              height: '4.5rem',
              '&::before': {
                content: '""',
                display: 'block',
                height: '100%',
                width: `${batteryPercentage}%`,
                background: palette.secondary.main,
                mask: `url("${BatteryMaskSvg}") left / 6.4rem 4.5rem no-repeat`,
                animation: charging
                  ? `expand-${batteryPercentage} ${speedOfBatteryAnimation}s linear infinite`
                  : `none`,
              },
            }}
          ></Box>
        </Card>
        <Box
          sx={{
            width: '0.8rem',
            height: '3.6rem',
            background: palette.secondary.main,
            borderRadius: '0.8rem',
          }}
        ></Box>
      </Box>

      {/* -------------------------- Battery Min/Max -------------------------- */}
      <Box>
        <Typography
          fontWeight={500}
          fontSize={ui_vars.font_size.xs}
          lineHeight={'1.8rem'}
          color={palette.secondary.main}
          textTransform={'uppercase'}
        >
          <span style={{ color: palette.text?.primary, marginRight: '5px' }}>
            {t('min')}
          </span>
          {isValueValid(chargeLimitMin)
            ? `${chargeLimitMin}%`
            : EMPTY_VALUE_PLACEHOLDER}
        </Typography>

        <Typography
          fontWeight={500}
          fontSize={ui_vars.font_size.xs}
          lineHeight={'1.8rem'}
          color={palette.secondary.main}
          textTransform={'uppercase'}
        >
          <span style={{ color: palette.text?.primary, marginRight: '5px' }}>
            {t('max')}
          </span>
          {isValueValid(chargeLimitMax)
            ? `${chargeLimitMax}%`
            : EMPTY_VALUE_PLACEHOLDER}
        </Typography>
      </Box>
    </Card>
  );
};
