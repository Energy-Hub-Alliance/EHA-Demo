import { Box, Typography, useTheme } from '@mui/material';
import { homePowerTypesToIcons } from '../../shared/mappers/homePowerTypesToIcons';
import {
  useGetBatteryDetailsQuery,
  useLazyGetRefreshedBatteryDetailsQuery,
} from '../../../../store/home-power/battery/batteryApi';
import { useParams } from 'react-router-dom';
import { skipToken } from '@reduxjs/toolkit/query';
import { NavigationHeader } from '../../shared/header/NavigationHeader';
import RefreshIcon from '../../shared/assets/icons/refresh.svg?react';
import { HomePowerType } from '../../../../store/home-power/enums/homePowerTypeEnum';
import { StatusChip } from '../vehicle/StatusChip';
import { useTranslation } from 'react-i18next';
import VendorIcon from '../../shared/assets/homePower/vendor.svg?react';
import ModelIcon from '../../shared/assets/homePower/battery/details/model-battery.svg?react';
import { DetailCard } from '../../shared/components/DetailCard';
import { BatteryDetailsModel } from '../../../../store/home-power/battery/details/batteryDetailsModel';
import { useEffect, useState } from 'react';
import { Loader } from '../../shared/loader/Loader';
import { ErrorPage } from '../errorPage/ErrorPage';
import { DoubleDetailCard } from '../../shared/components/DoubleDetailCard';
import CapacityIcon from '../../shared/assets/homePower/battery/details/capacity-battery.svg?react';
import PowerIcon from '../../shared/assets/homePower/battery/details/power-battery.svg?react';
import MaxChargeIcon from '../../shared/assets/homePower/battery/details/max-charge.svg?react';
import MaxDischargeIcon from '../../shared/assets/homePower/battery/details/max-discharge.svg?react';
import { FooterWrapper } from '../../shared/wrappers/FooterWrapper';
import { DeleteButton } from '../../shared/components/DeleteButton';
import { DeleteBatteryDialog } from './DeleteBatteryDialog';
import { showSnackbar } from '../../shared/snackbar/snackbarUtils';
import { AnimatedBatteryCard } from '../../shared/components/AnimatedBatteryCard';
import { BatteryStateEnum } from '../../../../store/home-power/enums/batteryStateEnum';
import { usePersistedVendorInfo } from '../../../hooks/usePersistedVendorInfo';
import { getApiErrorMessage } from '../../../../store/util/getApiErrorMessage';

enum BatteryDetail {
  BATTERY_POWER = 'BATTERY_POWER',
  BATTERY_CAPACITY = 'BATTERY_CAPACITY',
  MAX_CHARGE_RATE = 'MAX_CHARGE_RATE',
  MAX_DISCHARGE_RATE = 'MAX_DISCHARGE_RATE',
}

export const BatteryStorageDetailsPage = () => {
  const { homePowerId } = useParams<{ homePowerId: string }>();
  const { ui_vars } = useTheme();
  const { t } = useTranslation();

  const [batteryDetails, setBatteryDetails] =
    useState<BatteryDetailsModel | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const vendorInfo = usePersistedVendorInfo(batteryDetails?.staticData.vendor);

  const { data, isLoading, isError } = useGetBatteryDetailsQuery(
    homePowerId ?? skipToken
  );

  const [trigger, { isLoading: isRefreshLoading }] =
    useLazyGetRefreshedBatteryDetailsQuery();

  const handleRefresh = () => {
    trigger(homePowerId as string).then((result) => {
      if (result.isSuccess) {
        setBatteryDetails(result.data as BatteryDetailsModel);
        showSnackbar('success', t(`homePowerDetailsSnackbar.success`));
      }
      if (result.isError) {
        const errorName = getApiErrorMessage(result.error);
        showSnackbar('error', t(`errorCodes.${errorName}`));
      }
    });
  };
  const BatteryTypeIcon = homePowerTypesToIcons[HomePowerType.BATTERY];

  // ---------------- useEffect
  useEffect(() => {
    if (data) {
      setBatteryDetails(data);
    }
  }, [data]);

  if (isLoading || isRefreshLoading) return <Loader />;
  if (isError) return <ErrorPage />;
  return (
    batteryDetails && (
      <>
        {/* -------------------------- Header -------------------------- */}
        <NavigationHeader
          action={{
            icon: RefreshIcon,
            onClick: handleRefresh,
          }}
          logo={vendorInfo.Icon}
          location="/home-power"
        />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            p: ui_vars.other.page_spacing,
            gap: 4,
            height: `calc(100dvh - ${ui_vars.other.header_height})`,
            overflow: 'auto',
            pb: `calc(${ui_vars.other.footer_height} + 2rem)`,
          }}
        >
          {/* -------------------------- Battery image -------------------------- */}

          <Box>
            <BatteryTypeIcon />
          </Box>

          {/* -------------------------- Display name -------------------------- */}
          <Typography
            fontWeight={700}
            fontSize={ui_vars.font_size.xl}
            lineHeight={'3.2rem'}
            textAlign={'center'}
          >
            {batteryDetails?.staticData.name}
          </Typography>
          {/* -------------------------- Battery status/state -------------------------- */}
          {batteryDetails.batteryState.state ? (
            <StatusChip status={batteryDetails?.batteryState.state} />
          ) : null}

          {/* -------------------------- Details cards -------------------------- */}
          <DetailCard
            label={t('vendor')}
            value={vendorInfo.name}
            icon={VendorIcon}
          />
          <DetailCard
            label={t('model')}
            value={batteryDetails.staticData.model}
            icon={ModelIcon}
          />

          <AnimatedBatteryCard
            charging={
              batteryDetails.batteryState.state === BatteryStateEnum.CHARGING
            }
            stateOfCharge={batteryDetails.batteryState.stateOfCharge}
            chargeLimitMax={batteryDetails.batteryState.chargeLimitMax}
            chargeLimitMin={batteryDetails.batteryState.chargeLimitMin}
          />
          {/* -------------------------- Details cards -------------------------- */}
          <DoubleDetailCard
            firstElement={{
              icon: PowerIcon,
              unit: t(`unit.kw`),
              label: t(`batteryDetails.${BatteryDetail.BATTERY_POWER}`),
              value: batteryDetails?.batteryState.chargeRate,
            }}
            secondElement={{
              icon: CapacityIcon,
              unit: t(`unit.kwh`),
              label: t(`batteryDetails.${BatteryDetail.BATTERY_CAPACITY}`),
              value: batteryDetails?.staticData.batteryCapacity,
            }}
          />

          <DoubleDetailCard
            firstElement={{
              icon: MaxChargeIcon,
              unit: t(`unit.kw`),
              label: t(`batteryDetails.${BatteryDetail.MAX_CHARGE_RATE}`),
              value: batteryDetails?.batteryState.maxChargeRate,
            }}
            secondElement={{
              icon: MaxDischargeIcon,
              unit: t(`unit.kw`),
              label: t(`batteryDetails.${BatteryDetail.MAX_DISCHARGE_RATE}`),
              value: batteryDetails?.batteryState.maxDischargeRate,
            }}
          />
          <FooterWrapper>
            <DeleteButton
              onClick={() => setIsDeleteModalOpen(true)}
              title={t('deleteButton')}
            />
          </FooterWrapper>

          {/* -------------------------- Delete Modal -------------------------- */}

          <DeleteBatteryDialog
            open={isDeleteModalOpen}
            onClose={() => {
              setIsDeleteModalOpen(false);
            }}
            batteryId={batteryDetails?.batteryId || ''}
          />
        </Box>
      </>
    )
  );
};
