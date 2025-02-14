// ---------------------------------------- IMPORTS ---------------------------------------- //
import { Box, Typography, useTheme } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import {
  useGetHvacDetailsQuery,
  useLazyGetRefreshedHvacDetailsQuery,
} from '../../../../../store/hvac/hvacApi';
import { Loader } from '../../../shared/loader/Loader';
import { NavigationHeader } from '../../../shared/header/NavigationHeader';
import { HvacDetailsModel } from '../../../../../store/hvac/details/hvacDetailsModel';

import RefreshIcon from '../../../shared/assets/icons/refresh.svg?react';
import LocationIcon from '../../../shared/assets/hvac/details/location.svg?react';
import { hvacModesToIcons } from '../../../shared/mappers/hvacModesToIcons';
import { HvacMode } from '../../../../../store/hvac/enums/hvacModeEnum';
import { DetailCard } from '../../../shared/components/DetailCard';
import { usePersistedVendorInfo } from '../../../../hooks/usePersistedVendorInfo';
import { DesiredTemperatureCard } from './DesiredTemperatureCard';
import { Schedules } from './Schedules';
import TemperatureIcon from '../../../shared/assets/hvac/details/temperature.svg?react';
import { DoubleDetailCard } from '../../../shared/components/DoubleDetailCard';
import { FooterWrapper } from '../../../shared/wrappers/FooterWrapper';
import { DeleteButton } from '../../../shared/components/DeleteButton';
import { DeleteHvacDialog } from './DeleteHvacDialog';
import { showSnackbar } from '../../../shared/snackbar/snackbarUtils';
import { getApiErrorMessage } from '../../../../../store/util/getApiErrorMessage';

enum HvacDetail {
  TEMPERATURE_CURRENT = 'TEMPERATURE_CURRENT',
  TEMPERATURE_OUTSIDE = 'TEMPERATURE_OUTSIDE',
}

// ---------------------------------------- COMPONENT ---------------------------------------- //
export const HvacDetailsPage = () => {
  const { t } = useTranslation();
  const { ui_vars } = useTheme();

  const { hvacId } = useParams<{ hvacId: string }>();

  // ---------------- States
  const [hvacDetails, setHvacDetails] = useState<HvacDetailsModel | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // ---------------- Fetch data
  const { data: hvac, isLoading: isGetDetailsLoading } = useGetHvacDetailsQuery(
    hvacId as string,
    {}
  );

  const [trigger, { isLoading: isRefreshLoading }] =
    useLazyGetRefreshedHvacDetailsQuery();

  const handleRefresh = () => {
    trigger(hvacId as string).then((result) => {
      if (result.isSuccess) {
        setHvacDetails(result.data as HvacDetailsModel);
        showSnackbar('success', t(`hvacDetailsSnackbar.success`));
      }
      if (result.isError) {
        const errorName = getApiErrorMessage(result.error);
        showSnackbar('error', t(`errorCodes.${errorName}`));
      }
    });
  };

  // ---------------- useEffect
  useEffect(() => {
    if (hvac) {
      setHvacDetails(hvac);
    }
  }, [hvac]);

  // ---------------- Logo and mode icon from vendorInfo
  const vendorInfo = usePersistedVendorInfo(hvacDetails?.staticData.vendor);

  const ActiveModeIcon =
    hvacModesToIcons[hvacDetails?.climateState.mode as HvacMode];

  // ---------------- Loader
  if (isRefreshLoading || isGetDetailsLoading || !hvacDetails)
    return <Loader />;

  // ---------------- Return
  return (
    <>
      {/* -------------------------- Header -------------------------- */}
      <NavigationHeader
        action={{
          icon: RefreshIcon,
          onClick: handleRefresh,
        }}
        location="/hvacs"
        logo={vendorInfo.Icon}
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
        {/* -------------------------- Detail cards -------------------------- */}
        <DetailCard
          data-testid={`hvacDetailsRoom`}
          icon={LocationIcon}
          label={t('room').toUpperCase()}
          value={hvacDetails.staticData.room}
        />

        <DetailCard
          data-testid={`hvacDetailsMode`}
          icon={ActiveModeIcon}
          label={t('mode').toUpperCase()}
          value={
            hvacDetails.climateState.mode &&
            t(`hvacModes.${hvacDetails.climateState.mode}`)
          }
        />

        {/* -------------------------- Current and Outside Temperature -------------------------- */}

        <DoubleDetailCard
          firstElement={{
            icon: TemperatureIcon,
            label: t(`hvacDetails.${HvacDetail.TEMPERATURE_OUTSIDE}`),
            value: hvacDetails?.climateState?.temperatureOutside,
            unit: t(`unit.celsius`),
          }}
          secondElement={{
            icon: TemperatureIcon,
            label: t(`hvacDetails.${HvacDetail.TEMPERATURE_CURRENT}`),
            value: hvacDetails?.climateState?.temperatureCurrent,
            unit: t(`unit.celsius`),
          }}
        />

        {/* -------------------------- Desired Temperature -------------------------- */}
        <Box
          sx={{
            width: '100%',
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            gap: 4,
          }}
        >
          <Typography
            fontWeight={700}
            fontSize={ui_vars.font_size.m}
            lineHeight={'2.4rem'}
          >
            {t('hvacDetailsDesiredTemperature')}
          </Typography>

          {hvacDetails.climateState.temperatureTargets.map((target) => {
            return (
              <DesiredTemperatureCard
                mode={target.mode}
                temperature={target.temperature}
                key={target.mode}
              />
            );
          })}
        </Box>
        {/* -------------------------- Schedules -------------------------- */}
        <Box
          sx={{
            width: '100%',
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            gap: 4,
          }}
        >
          <Schedules hvacId={hvacId} />
        </Box>
      </Box>

      <FooterWrapper>
        <DeleteButton
          onClick={() => setIsDeleteModalOpen(true)}
          title={t('deleteButton')}
        />
      </FooterWrapper>

      {/* -------------------------- Delete Modal -------------------------- */}

      <DeleteHvacDialog
        open={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
        }}
        hvacId={hvacDetails?.id || ''}
      />
    </>
  );
};
