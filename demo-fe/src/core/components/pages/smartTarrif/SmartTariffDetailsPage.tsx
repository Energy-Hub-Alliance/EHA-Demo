import { useParams } from 'react-router-dom';
import { NavigationHeader } from '../../shared/header/NavigationHeader';
import RefreshIcon from '../../shared/assets/icons/refresh.svg?react';
import {
  SmartTarrifManufacturer,
  smartTariffManufacturersToIcons,
} from '../../shared/mappers/smartTariffManufacturersToIcons';
import { SmartTariffDetailsPairCard } from './SmartTariffDetailsPairCard';
import { Prices } from './Prices';
import { Consumptions } from './Consumptions';
import { useTranslation } from 'react-i18next';
import { Box } from '@mui/material';
import {
  useGetConsumptionStatsQuery,
  useGetPriceDataQuery,
  useGetTariffDetailsQuery,
} from '../../../../store/tariff/tariffApi';
import { skipToken } from '@reduxjs/toolkit/query';
import { useMemo } from 'react';
import { TIMEZONE } from './smartTariffUtils';
import { Loader } from '../../shared/loader/Loader';

// ---------------------------------------- COMPONENT ---------------------------------------- //

export const SmartTariffDetailsPage = () => {
  const { smartTariffId } = useParams<{ smartTariffId: string }>();
  const { t } = useTranslation();

  const { data: tariffDetails, isLoading: isTariffDetailsLoading } =
    useGetTariffDetailsQuery(smartTariffId ?? skipToken);

  const {
    data: prices,
    refetch: refetchPrices,
    isFetching: isPricesFetching,
  } = useGetPriceDataQuery(smartTariffId ?? skipToken);
  const {
    data: consumptionStats,
    refetch: refetchConsumption,
    isFetching: isConsumptionFetching,
  } = useGetConsumptionStatsQuery(
    { tariffId: smartTariffId || '', timezone: TIMEZONE },
    { skip: smartTariffId === '' }
  );

  const Logo =
    smartTariffManufacturersToIcons[
      tariffDetails?.vendor as SmartTarrifManufacturer
    ];

  const currentPrice = useMemo(() => {
    // Comparing price from current date and hour from the recieved list - Example after split: "2024-04-04T09"
    const currentDateHourUTC = new Date().toISOString().split(':')[0];
    const result = prices?.find(
      (price) => price.starts_at.split(':')[0] === currentDateHourUTC
    );
    return result;
  }, [prices]);

  const handleRefresh = () => {
    refetchPrices();
    refetchConsumption();
  };

  if (isTariffDetailsLoading || isPricesFetching || isConsumptionFetching)
    return <Loader />;

  return (
    smartTariffId && (
      <>
        {/* -------------------------- Header -------------------------- */}
        <NavigationHeader
          action={{
            icon: RefreshIcon,
            onClick: handleRefresh,
          }}
          logo={Logo}
          location="/smart-tariffs"
        />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            p: 4,
            pt: 1,
            rowGap: 3,
          }}
        >
          <SmartTariffDetailsPairCard
            firstDetail={{
              smartTariffDetail: 'CURRENCY',
              detailValue: tariffDetails?.currency
                ? tariffDetails?.currency.toLocaleUpperCase()
                : '',
            }}
            secondDetail={{
              smartTariffDetail: 'COUNTRY',
              detailValue: tariffDetails?.country
                ? t(`country.${tariffDetails?.country}`)
                : '',
            }}
          />

          <SmartTariffDetailsPairCard
            firstDetail={{
              smartTariffDetail: 'CURRENT_PRICE',
              detailValue: currentPrice?.total_price.toFixed(2) ?? '',
              unit: `(${currentPrice?.vat.toFixed(1) ?? ''} ${t(
                'unit.vat'
              ).toLocaleUpperCase()})`,
            }}
            secondDetail={{
              smartTariffDetail: 'CONSUMPTION_TODAY',
              detailValue: consumptionStats?.today.toFixed(2) ?? '',
              unit: t(`unit.kwh`),
            }}
          />
          <Consumptions smartTariffId={smartTariffId} />
          <SmartTariffDetailsPairCard
            firstDetail={{
              smartTariffDetail: 'CONSUMPTION_YESTERDAY',
              detailValue: consumptionStats?.yesterday.toFixed(2) ?? '',
              unit: t(`unit.kwh`),
            }}
            secondDetail={{
              smartTariffDetail: 'CONSUMPTION_LAST_MONTH',
              detailValue: consumptionStats?.lastMonth.toFixed(2) ?? '',
              unit: t(`unit.kwh`),
            }}
          />
          {prices ? (
            <Prices prices={prices} currency={tariffDetails?.currency ?? ''} />
          ) : null}
        </Box>
      </>
    )
  );
};
