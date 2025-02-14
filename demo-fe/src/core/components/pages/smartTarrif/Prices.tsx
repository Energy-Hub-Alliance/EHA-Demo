import { Box, Button, Typography, alpha, useTheme } from '@mui/material';
import { useMemo, useState } from 'react';
import { stringEnumToArray } from '../../shared/mappers/stringEnumToArray';
import { useTranslation } from 'react-i18next';
import { PriceChart } from './PriceChart';
import {
  PricePeriod,
  SmartTariffDetail,
  formatPriceDuration,
} from './smartTariffUtils';
import { PriceModel } from '../../../../store/tariff/priceModel';
import PriceDownIcon from '../../shared/assets/smartTariff/details/price-down.svg?react';
import PriceUpIcon from '../../shared/assets/smartTariff/details/price-up.svg?react';
import { DoubleDetailCard } from '../../shared/components/DoubleDetailCard';

export const Prices = ({
  prices,
  currency,
}: {
  prices: PriceModel[];
  currency: string;
}) => {
  const { palette, ui_vars } = useTheme();
  const { t } = useTranslation();
  const [activePriceOption, setActivePriceOption] = useState<PricePeriod>(
    PricePeriod.TODAY
  );

  // Getting always 48 elements of today and tomorrow in UTC, or 24 elements for today only
  // Tomorrow button would be disabled if there is no data for tomorrow
  const selectedPrices =
    activePriceOption === PricePeriod.TODAY
      ? prices.slice(0, 24)
      : prices.slice(24, 48);

  // Data for the chart
  const priceTotalValues = useMemo(
    () => selectedPrices.map((price) => price.total_price),
    [selectedPrices]
  );

  // Min and Max price calculation for today/tomorrow
  const calculatedPrice = useMemo(() => {
    return {
      min: selectedPrices?.filter(
        (price) =>
          price.total_price ===
          Math.min(...selectedPrices.map((price) => price.total_price))
      )[0],
      max: selectedPrices?.filter(
        (price) =>
          price.total_price ===
          Math.max(...selectedPrices.map((price) => price.total_price))
      )[0],
    };
  }, [selectedPrices]);

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
        data-testid={`smartTariffPriceTitle`}
        fontWeight={700}
        fontSize={ui_vars.font_size.l}
        sx={{
          width: 'fit-content',
          textAlign: 'center',
        }}
      >
        {t('electricityPrices')}
      </Typography>

      <Box
        sx={{
          backgroundColor: palette.background?.paper,
          borderRadius: 2,
        }}
      >
        {stringEnumToArray(PricePeriod).map((pricePeriodOption) => (
          <Button
            disabled={
              pricePeriodOption === PricePeriod.TOMORROW && prices.length <= 24
            }
            sx={{
              backgroundColor:
                pricePeriodOption === activePriceOption.toString()
                  ? palette.primary.main
                  : 'inherit',
              pointerEvents:
                pricePeriodOption === activePriceOption.toString()
                  ? 'none'
                  : 'auto',
              color: palette.common.white,
              borderRadius: 2,
              //For mobile devices - hover is applied by default by Mui lib - which causes issues with Button background color.
              //If this issue appears often, define in theme hover overrides (if needed for the future)
              '&:hover': {
                backgroundColor:
                  pricePeriodOption === activePriceOption.toString()
                    ? palette.primary.main
                    : // Hover is defined but only visible for desktop devices, it will not be applied for mobile devices since there is no hover.
                      `${alpha(palette.primary.main, 0.08)}`,
              },
            }}
            key={pricePeriodOption}
            onClick={() =>
              setActivePriceOption(pricePeriodOption as PricePeriod)
            }
          >
            <Typography sx={{ fontWeight: 600 }}>
              {t(`period.${pricePeriodOption}`)}
            </Typography>
          </Button>
        ))}
      </Box>
      <Box width="100%">
        <PriceChart priceData={priceTotalValues} priceCurrency={currency} />
      </Box>

      <DoubleDetailCard
        firstElement={{
          icon: PriceUpIcon,
          label: t(`detailsTariffs.${SmartTariffDetail.MAX_PRICE}`),
          unit: currency ?? '',
          value: calculatedPrice?.max?.total_price
            ? calculatedPrice?.max?.total_price.toFixed(2)
            : calculatedPrice?.max?.total_price,
          additionalInfo: calculatedPrice?.max?.starts_at
            ? formatPriceDuration(calculatedPrice?.max?.starts_at)
            : '',
        }}
        secondElement={{
          icon: PriceDownIcon,
          label: t(`detailsTariffs.${SmartTariffDetail.MIN_PRICE}`),
          unit: currency ?? '',
          value: calculatedPrice?.min?.total_price
            ? calculatedPrice?.min?.total_price.toFixed(2)
            : calculatedPrice?.min?.total_price,
          additionalInfo: calculatedPrice?.min?.starts_at
            ? formatPriceDuration(calculatedPrice?.min?.starts_at)
            : '',
        }}
      />
    </Box>
  );
};
