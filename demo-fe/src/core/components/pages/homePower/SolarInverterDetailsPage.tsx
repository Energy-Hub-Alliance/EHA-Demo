import { Box, Typography, useTheme } from '@mui/material';
import { homePowerTypesToIcons } from '../../shared/mappers/homePowerTypesToIcons';
import { useParams } from 'react-router-dom';
import { skipToken } from '@reduxjs/toolkit/query';
import { Loader } from '../../shared/loader/Loader';
import { NavigationHeader } from '../../shared/header/NavigationHeader';
import RefreshIcon from '../../shared/assets/icons/refresh.svg?react';
import { HomePowerType } from '../../../../store/home-power/enums/homePowerTypeEnum';
import { ErrorPage } from '../errorPage/ErrorPage';
import {
  useGetPvInverterDetailsQuery,
  useLazyGetRefreshedPvInverterDetailsQuery,
} from '../../../../store/home-power/pv-inverter/pvInverterApi';
import { StatusChip } from '../vehicle/StatusChip';
import VendorIcon from '../../shared/assets/homePower/vendor.svg?react';
import ModelIcon from '../../shared/assets/homePower/inverters/details/inverter-model.svg?react';
import SolarPowerIcon from '../../shared/assets/homePower/inverters/details/inverter-solar-power.svg?react';
import { useTranslation } from 'react-i18next';
import { DetailCard } from '../../shared/components/DetailCard';
import { useEffect, useState } from 'react';
import { PvInverterDetailsModel } from '../../../../store/home-power/pv-inverter/details/pvInverterDetailsModel';
import { FooterWrapper } from '../../shared/wrappers/FooterWrapper';
import { DeleteButton } from '../../shared/components/DeleteButton';
import { DeleteInverterDialog } from './DeleteInverterDialog';
import { showSnackbar } from '../../shared/snackbar/snackbarUtils';
import { usePersistedVendorInfo } from '../../../hooks/usePersistedVendorInfo';
import { getApiErrorMessage } from '../../../../store/util/getApiErrorMessage';

export const SolarInverterDetailsPage = () => {
  const { homePowerId } = useParams<{ homePowerId: string }>();
  const { ui_vars } = useTheme();
  const { t } = useTranslation();

  const [pvInverterDetails, setPvInverterDetails] =
    useState<PvInverterDetailsModel | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const { data, isLoading, isError } = useGetPvInverterDetailsQuery(
    homePowerId ?? skipToken
  );

  const vendorInfo = usePersistedVendorInfo(
    pvInverterDetails?.staticData.vendor
  );

  const [trigger, { isLoading: isRefreshLoading }] =
    useLazyGetRefreshedPvInverterDetailsQuery();

  const handleRefresh = () => {
    trigger(homePowerId as string).then((result) => {
      if (result.isSuccess) {
        setPvInverterDetails(result.data as PvInverterDetailsModel);
        showSnackbar('success', t(`homePowerDetailsSnackbar.success`));
      }
      if (result.isError) {
        const errorName = getApiErrorMessage(result.error);
        showSnackbar('error', t(`errorCodes.${errorName}`));
      }
    });
  };

  const PvInverterTypeIcon = homePowerTypesToIcons[HomePowerType.PV_INVERTER];

  // ---------------- useEffect
  useEffect(() => {
    if (data) {
      setPvInverterDetails(data);
    }
  }, [data]);

  if (isLoading || isRefreshLoading) return <Loader />;
  if (isError) return <ErrorPage />;

  return (
    pvInverterDetails && (
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
            <PvInverterTypeIcon />
          </Box>

          <Typography
            fontWeight={700}
            fontSize={ui_vars.font_size.xl}
            lineHeight={'3.2rem'}
            textAlign={'center'}
          >
            {pvInverterDetails?.staticData.name}
          </Typography>
          {pvInverterDetails?.powerState.state ? (
            <StatusChip status={pvInverterDetails.powerState.state} />
          ) : null}
          <DetailCard
            icon={VendorIcon}
            label={t('vendor')}
            value={vendorInfo.name}
          />
          <DetailCard
            icon={ModelIcon}
            label={t('model')}
            value={pvInverterDetails?.staticData.model}
          />
          <DetailCard
            icon={SolarPowerIcon}
            label={t('solarPower')}
            value={
              pvInverterDetails?.powerState?.solarPower
                ? pvInverterDetails?.powerState?.solarPower.toString()
                : pvInverterDetails?.powerState?.solarPower
            }
            unit={t(`unit.kw`)}
          />
        </Box>
        <FooterWrapper>
          <DeleteButton
            onClick={() => setIsDeleteModalOpen(true)}
            title={t('deleteButton')}
          />
        </FooterWrapper>

        {/* -------------------------- Delete Modal -------------------------- */}

        <DeleteInverterDialog
          open={isDeleteModalOpen}
          onClose={() => {
            setIsDeleteModalOpen(false);
          }}
          pvInverterId={pvInverterDetails?.pvInverterId || ''}
        />
      </>
    )
  );
};
