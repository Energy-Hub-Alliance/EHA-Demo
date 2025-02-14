import { Box, Typography, useTheme } from '@mui/material';
import { homePowerTypesToIcons } from '../../shared/mappers/homePowerTypesToIcons';
import { useParams } from 'react-router-dom';
import { skipToken } from '@reduxjs/toolkit/query';
import { Loader } from '../../shared/loader/Loader';
import { NavigationHeader } from '../../shared/header/NavigationHeader';
import RefreshIcon from '../../shared/assets/icons/refresh.svg?react';
import { HomePowerType } from '../../../../store/home-power/enums/homePowerTypeEnum';
import { ErrorPage } from '../errorPage/ErrorPage';
import VendorIcon from '../../shared/assets/homePower/vendor.svg?react';
import ModelIcon from '../../shared/assets/homePower/meters/details/meterModel.svg?react';
import { useTranslation } from 'react-i18next';
import { DetailCard } from '../../shared/components/DetailCard';
import { useEffect, useState } from 'react';
import {
  useGetMeterDetailsQuery,
  useLazyGetRefreshedMeterDetailsQuery,
} from '../../../../store/home-power/meters/meterApi';
import { MeterDetailsModel } from '../../../../store/home-power/meters/details/meterDetailsModel';
import ConsumptionIcon from '../../shared/assets/homePower/meters/details/consumption.svg?react';
import MeterValueIcon from '../../shared/assets/homePower/meters/details/meterValue.svg?react';
import { DoubleDetailCard } from '../../shared/components/DoubleDetailCard';
import { FooterWrapper } from '../../shared/wrappers/FooterWrapper';
import { DeleteButton } from '../../shared/components/DeleteButton';
import { DeleteMeterDialog } from './DeleteMeterDialog';
import { showSnackbar } from '../../shared/snackbar/snackbarUtils';
import { usePersistedVendorInfo } from '../../../hooks/usePersistedVendorInfo';
import { getApiErrorMessage } from '../../../../store/util/getApiErrorMessage';

enum MeterDetail {
  POWER = 'POWER',
  METER_VALUE = 'METER_VALUE',
}

export const MetersDetailsPage = () => {
  const { homePowerId } = useParams<{ homePowerId: string }>();
  const { ui_vars } = useTheme();
  const { t } = useTranslation();

  const [meterDetails, setMeterDetails] = useState<MeterDetailsModel | null>(
    null
  );
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const { data, isLoading, isError } = useGetMeterDetailsQuery(
    homePowerId ?? skipToken
  );
  const vendorInfo = usePersistedVendorInfo(meterDetails?.staticData.vendor);

  const [trigger, { isLoading: isRefreshLoading }] =
    useLazyGetRefreshedMeterDetailsQuery();

  const handleRefresh = () => {
    trigger(homePowerId as string).then((result) => {
      if (result.isSuccess) {
        setMeterDetails(result.data as MeterDetailsModel);
        showSnackbar('success', t(`homePowerDetailsSnackbar.success`));
      }
      if (result.isError) {
        const errorName = getApiErrorMessage(result.error);
        showSnackbar('error', t(`errorCodes.${errorName}`));
      }
    });
  };

  const MeterTypeIcon = homePowerTypesToIcons[HomePowerType.METER];

  // ---------------- useEffect
  useEffect(() => {
    if (data) {
      setMeterDetails(data);
    }
  }, [data]);

  if (isLoading || isRefreshLoading) return <Loader />;
  if (isError) return <ErrorPage />;

  return (
    meterDetails && (
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
            <MeterTypeIcon />
          </Box>

          <Typography
            fontWeight={700}
            fontSize={ui_vars.font_size.xl}
            lineHeight={'3.2rem'}
            textAlign={'center'}
          >
            {meterDetails?.staticData.name}
          </Typography>

          <DoubleDetailCard
            firstElement={{
              icon: ConsumptionIcon,
              unit: t(`unit.kw`),
              label: t(`meterDetails.${MeterDetail.POWER}`),
              value: meterDetails.powerState.power,
            }}
            secondElement={{
              icon: MeterValueIcon,
              unit: t(`unit.kwh`),
              label: t(`meterDetails.${MeterDetail.METER_VALUE}`),
              value: meterDetails.powerState.meterValue,
            }}
          />
          <DetailCard
            icon={VendorIcon}
            label={t('vendor')}
            value={vendorInfo.name}
          />
          <DetailCard
            icon={ModelIcon}
            label={t('model')}
            value={meterDetails?.staticData.model}
          />
        </Box>
        <FooterWrapper>
          <DeleteButton
            onClick={() => setIsDeleteModalOpen(true)}
            title={t('deleteButton')}
          />
        </FooterWrapper>

        {/* -------------------------- Delete Modal -------------------------- */}

        <DeleteMeterDialog
          open={isDeleteModalOpen}
          onClose={() => {
            setIsDeleteModalOpen(false);
          }}
          meterId={meterDetails?.meterId || ''}
        />
      </>
    )
  );
};
