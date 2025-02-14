import { useParams } from 'react-router-dom';
import { NavigationHeader } from '../../shared/header/NavigationHeader';
import RefreshIcon from '../../shared/assets/icons/refresh.svg?react';
import { Prices } from './Prices';
import { Consumptions } from './Consumptions';
import { useTranslation } from 'react-i18next';
import { Box, useTheme } from '@mui/material';
import {
  useGetConsumptionStatsQuery,
  useGetPriceDataQuery,
  useGetTariffDetailsQuery,
} from '../../../../store/tariff/tariffApi';
import { skipToken } from '@reduxjs/toolkit/query';
import { useMemo, useState } from 'react';
import { SmartTariffDetail, TIMEZONE } from './smartTariffUtils';
import { Loader } from '../../shared/loader/Loader';
import { usePersistedVendorInfo } from '../../../hooks/usePersistedVendorInfo';
import {
  DoubleDetailCard,
  EMPTY_VALUE_PLACEHOLDER,
} from '../../shared/components/DoubleDetailCard';
import CurrencyIcon from '../../shared/assets/smartTariff/details/currency.svg?react';
import CashBanknoteIcon from '../../shared/assets/smartTariff/details/cash-banknote.svg?react';
import CountryIcon from '../../shared/assets/smartTariff/details/country.svg?react';
import ConsumptionIcon from '../../shared/assets/smartTariff/details/consumption.svg?react';
import { FooterWrapper } from '../../shared/wrappers/FooterWrapper';
import { DeleteButton } from '../../shared/components/DeleteButton';
import { DeleteSmartTariffDialog } from './DeleteSmartTariffDialog';
import { showSnackbar } from '../../shared/snackbar/snackbarUtils';

// ---------------------------------------- COMPONENT ---------------------------------------- //

export const SmartTariffDetailsPage = () => {
  const { smartTariffId } = useParams<{ smartTariffId: string }>();
  const { t } = useTranslation();
  const { ui_vars } = useTheme();

  // ---------------- States
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

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

  const vendorInfo = usePersistedVendorInfo(tariffDetails?.staticData.vendor);

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
    showSnackbar('success', t(`smartTariffDetailsSnackbarMessage`));
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
          logo={vendorInfo.Icon}
          location="/smart-tariffs"
        />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            p: 4,
            pt: 1,
            rowGap: 3,
            pb: `calc(${ui_vars.other.footer_height} + 2rem)`,
          }}
        >
          <DoubleDetailCard
            firstElement={{
              icon: CurrencyIcon,
              label: t(`detailsTariffs.${SmartTariffDetail.CURRENCY}`),
              value: tariffDetails?.staticData.currency
                ? tariffDetails?.staticData.currency.toLocaleUpperCase()
                : tariffDetails?.staticData.currency,
            }}
            secondElement={{
              icon: CountryIcon,
              label: t(`detailsTariffs.${SmartTariffDetail.COUNTRY}`),
              value: tariffDetails?.staticData.countryCode
                ? t(`country.${tariffDetails?.staticData.countryCode}`)
                : tariffDetails?.staticData.countryCode,
            }}
          />
          <DoubleDetailCard
            firstElement={{
              icon: CashBanknoteIcon,
              label: t(`detailsTariffs.${SmartTariffDetail.CURRENT_PRICE}`),
              value: currentPrice?.total_price
                ? currentPrice?.total_price.toFixed(2)
                : currentPrice?.total_price,
              unit: currentPrice?.vat
                ? `(${
                    currentPrice?.vat.toFixed(2) ?? EMPTY_VALUE_PLACEHOLDER
                  } ${t('unit.vat').toLocaleUpperCase()})`
                : '',
            }}
            secondElement={{
              icon: ConsumptionIcon,
              label: t(`detailsTariffs.${SmartTariffDetail.CONSUMPTION_TODAY}`),
              value: consumptionStats?.today
                ? consumptionStats?.today.toFixed(2)
                : consumptionStats?.today,
              unit: t(`unit.kwh`),
            }}
          />

          <Consumptions smartTariffId={smartTariffId} />
          <DoubleDetailCard
            firstElement={{
              icon: ConsumptionIcon,
              label: t(
                `detailsTariffs.${SmartTariffDetail.CONSUMPTION_YESTERDAY}`
              ),
              value: consumptionStats?.yesterday
                ? consumptionStats?.yesterday.toFixed(2)
                : consumptionStats?.yesterday,
              unit: t(`unit.kwh`),
            }}
            secondElement={{
              icon: ConsumptionIcon,
              label: t(
                `detailsTariffs.${SmartTariffDetail.CONSUMPTION_LAST_MONTH}`
              ),
              value: consumptionStats?.lastMonth
                ? consumptionStats?.lastMonth.toFixed(2)
                : consumptionStats?.lastMonth,
              unit: t(`unit.kwh`),
            }}
          />
          {prices ? (
            <Prices
              prices={prices}
              currency={tariffDetails?.staticData.currency ?? ''}
            />
          ) : null}
        </Box>
        <FooterWrapper>
          <DeleteButton
            onClick={() => setIsDeleteModalOpen(true)}
            title={t('deleteButton')}
          />
        </FooterWrapper>

        {/* -------------------------- Delete Modal -------------------------- */}

        <DeleteSmartTariffDialog
          open={isDeleteModalOpen}
          onClose={() => {
            setIsDeleteModalOpen(false);
          }}
          tariffId={tariffDetails?.tariffId || ''}
        />
      </>
    )
  );
};
