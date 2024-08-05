// ---------------------------------------- IMPORTS ---------------------------------------- //
import { Box, Card, Typography, useTheme } from '@mui/material';

import CurrencyIcon from '../../shared/assets/smartTariff/details/currency.svg?react';
import CashBanknoteIcon from '../../shared/assets/smartTariff/details/cash-banknote.svg?react';
import CountryIcon from '../../shared/assets/smartTariff/details/country.svg?react';
import ConsumptionIcon from '../../shared/assets/smartTariff/details/consumption.svg?react';
import PriceDownIcon from '../../shared/assets/smartTariff/details/price-down.svg?react';
import PriceUpIcon from '../../shared/assets/smartTariff/details/price-up.svg?react';

import { useTranslation } from 'react-i18next';

// ---------------------------------------- CONSTANTS ---------------------------------------- //
enum SmartTariffDetail {
  CURRENCY = 'CURRENCY',
  COUNTRY = 'COUNTRY',
  CURRENT_PRICE = 'CURRENT_PRICE',
  CONSUMPTION_TODAY = 'CONSUMPTION_TODAY',
  CONSUMPTION_YESTERDAY = 'CONSUMPTION_YESTERDAY',
  CONSUMPTION_LAST_MONTH = 'CONSUMPTION_LAST_MONTH',
  MAX_PRICE = 'MAX_PRICE',
  MIN_PRICE = 'MIN_PRICE',
}

// ---------------------------------------- TYPES & INTERFACES ---------------------------------------- //

type SmartTariffDetailType = keyof typeof SmartTariffDetail;

interface SmartTariffDetailBoxProp {
  smartTariffDetail: SmartTariffDetailType;
  detailValue: string | number | boolean;
  unit?: string;
  additionalInfo?: string;
}

// ---------------------------------------- UTILITY ---------------------------------------- //
const smartTariffDetailsToIcons: {
  [type in SmartTariffDetail]: {
    icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  };
} = {
  CURRENCY: {
    icon: CurrencyIcon,
  },
  COUNTRY: {
    icon: CountryIcon,
  },
  CURRENT_PRICE: {
    icon: CashBanknoteIcon,
  },
  CONSUMPTION_TODAY: {
    icon: ConsumptionIcon,
  },
  CONSUMPTION_YESTERDAY: {
    icon: ConsumptionIcon,
  },
  CONSUMPTION_LAST_MONTH: {
    icon: ConsumptionIcon,
  },
  MAX_PRICE: {
    icon: PriceUpIcon,
  },
  MIN_PRICE: {
    icon: PriceDownIcon,
  },
};

// ---------------------------------------- HELPER COMPONENT ---------------------------------------- //
const SmartTariffBox = ({
  smartTariffDetail,
  detailValue,
  unit,
  additionalInfo,
}: SmartTariffDetailBoxProp) => {
  const { ui_vars } = useTheme();
  const { t } = useTranslation();
  const { icon } = smartTariffDetailsToIcons[smartTariffDetail];
  const DetailIcon = icon;

  return (
    <Box width={'45%'}>
      <Typography
        textTransform={'uppercase'}
        fontSize={ui_vars.font_size.xs}
        fontWeight={500}
        lineHeight={'1.8rem'}
      >
        {t(`detailsTariffs.${smartTariffDetail}`)}
      </Typography>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'flex-start',
          flexDirection: 'column',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <DetailIcon />

          <Typography
            fontSize={ui_vars.font_size.l}
            fontWeight={700}
            lineHeight={'3.2rem'}
            pl={2}
          >
            {`${
              typeof detailValue === 'boolean'
                ? t(`detailsBoolean.${detailValue}Value`)
                : detailValue
            }`}
          </Typography>

          <Typography
            fontSize={ui_vars.font_size.xs}
            fontWeight={400}
            lineHeight={'1.8rem'}
            pl={1}
          >
            {unit}
          </Typography>
        </Box>
        <Typography
          fontSize={ui_vars.font_size.xs}
          fontWeight={400}
          lineHeight={'1.8rem'}
          pl={8}
        >
          {additionalInfo}
        </Typography>
      </Box>
    </Box>
  );
};

// ---------------------------------------- MAIN COMPONENT ---------------------------------------- //
export const SmartTariffDetailsPairCard = ({
  firstDetail,
  secondDetail,
}: {
  firstDetail: SmartTariffDetailBoxProp;
  secondDetail: SmartTariffDetailBoxProp;
}) => {
  const { palette } = useTheme();

  return (
    <Card
      sx={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        gap: 4,
      }}
    >
      <SmartTariffBox
        smartTariffDetail={firstDetail.smartTariffDetail}
        detailValue={firstDetail.detailValue}
        unit={firstDetail.unit}
        additionalInfo={firstDetail.additionalInfo}
      />

      <Box
        sx={{
          width: '10%',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Box
          sx={{
            width: '1px',
            height: '3.6rem',
            background: palette.common.vertical_separator,
          }}
        ></Box>
      </Box>

      <SmartTariffBox
        smartTariffDetail={secondDetail.smartTariffDetail}
        detailValue={secondDetail.detailValue}
        unit={secondDetail.unit}
        additionalInfo={secondDetail.additionalInfo}
      />
    </Card>
  );
};
