import { Box, Button, Typography, alpha, useTheme } from '@mui/material';
import { useState } from 'react';
import { stringEnumToArray } from '../../shared/mappers/stringEnumToArray';
import { useTranslation } from 'react-i18next';
import { ConsumptionPeriod } from './smartTariffUtils';
import { ConsumptionChart } from './ConsumptionChart';

export const Consumptions = ({ smartTariffId }: { smartTariffId: string }) => {
  const { palette, ui_vars } = useTheme();
  const { t } = useTranslation();
  const [activeConsumptionOption, setActiveConsumptionOption] =
    useState<ConsumptionPeriod>(ConsumptionPeriod.TODAY);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        pt: 6,
        rowGap: 6,
      }}
    >
      <Typography
        data-testid={`smartTariffConsumptionTitle`}
        fontWeight={700}
        fontSize={ui_vars.font_size.l}
        sx={{
          width: 'fit-content',
          textAlign: 'center',
        }}
      >
        {t('consumption')}
      </Typography>
      <Box
        sx={{
          backgroundColor: palette.background?.paper,
          borderRadius: 2,
        }}
      >
        {stringEnumToArray(ConsumptionPeriod).map((consumptionOption) => (
          <Button
            sx={{
              backgroundColor:
                consumptionOption === activeConsumptionOption.toString()
                  ? `${palette.primary.main}`
                  : 'inherit',
              pointerEvents:
                consumptionOption === activeConsumptionOption.toString()
                  ? 'none'
                  : 'auto',
              color: palette.common.white,
              borderRadius: 2,
              //For mobile devices - hover is applied by default by Mui lib - which causes issues with Button background color.
              //If this issue appears often, define in theme hover overrides (if needed for the future)
              '&:hover': {
                backgroundColor:
                  consumptionOption === activeConsumptionOption.toString()
                    ? palette.primary.main
                    : // Hover is defined but only visible for desktop devices, it will not be applied for mobile devices since there is no hover.
                      `${alpha(palette.primary.main, 0.08)}`,
              },
            }}
            key={consumptionOption}
            onClick={() =>
              setActiveConsumptionOption(consumptionOption as ConsumptionPeriod)
            }
          >
            <Typography sx={{ fontWeight: 600 }}>
              {t(`period.${consumptionOption}`)}
            </Typography>
          </Button>
        ))}
      </Box>
      <Box width="100%">
        <ConsumptionChart
          consumptionPeriodOption={activeConsumptionOption}
          smartTariffId={smartTariffId}
        />
        <>
          <Box
            sx={{
              height: '3px',
              width: '35px',
              backgroundColor: palette.secondary.dark,
            }}
          />
          <Typography
            sx={{
              fontSize: ui_vars.font_size.xs,
              lineHeight: '2rem',
              mb: 6,
            }}
          >
            {t('consumptionLegend')}
          </Typography>
        </>
      </Box>
    </Box>
  );
};
