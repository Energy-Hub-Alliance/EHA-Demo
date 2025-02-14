// ---------------------------------------- IMPORTS ---------------------------------------- //
import { Box, Typography, useTheme } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import ActivePhaseIcon from '../../shared/assets/chargingHardware/details/active-phase.svg?react';
import RefreshIcon from '../../shared/assets/icons/refresh.svg?react';
import { ChargerDetailsModel } from '../../../../store/charging-hardware/details/chargerDetailsModel';
import {
  useGetChargerDetailsQuery,
  useLazyGetRefreshedChargerDetailsQuery,
} from '../../../../store/charging-hardware/chargingHardwareApi';
import { usePersistedVendorInfo } from '../../../hooks/usePersistedVendorInfo';
import { Loader } from '../../shared/loader/Loader';
import { NavigationHeader } from '../../shared/header/NavigationHeader';
import { DetailCard } from '../../shared/components/DetailCard';
import ChargerIcon from '../../shared/assets/chargingHardware/chargingHardware.svg?react';
import { StatusChip } from '../vehicle/StatusChip';
import { FooterWrapper } from '../../shared/wrappers/FooterWrapper';
import { ErrorPage } from '../errorPage/ErrorPage';
import { DoubleDetailCard } from '../../shared/components/DoubleDetailCard';
import PowerIcon from '../../shared/assets/chargingHardware/details/power-battery.svg?react';
import MaxChargeIcon from '../../shared/assets/chargingHardware/details/max-charge.svg?react';
import { DeleteButton } from '../../shared/components/DeleteButton';
import { DeleteChargingHardwareDialog } from './DeleteChargingHardwareDialog';
import { showSnackbar } from '../../shared/snackbar/snackbarUtils';
import { getApiErrorMessage } from '../../../../store/util/getApiErrorMessage';

// ---------------------------------------- COSTANTS ---------------------------------------- //

enum ChargerDetail {
  CHARGE_POWER = 'CHARGE_POWER',
  CHARGE_MAX_CURRENT = 'CHARGE_MAX_CURRENT',
}

// ---------------------------------------- COMPONENT ---------------------------------------- //
export const ChargingHardwareDetailsPage = () => {
  const { t } = useTranslation();
  const { ui_vars } = useTheme();
  const { hardwareId } = useParams<{ hardwareId: string }>();

  // ---------------- States
  const [chargerDetails, setChargerDetails] =
    useState<ChargerDetailsModel | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // ---------------- Fetch data
  const {
    data: charger,
    isLoading: isGetDetailsLoading,
    isError,
  } = useGetChargerDetailsQuery(hardwareId as string, {});

  const [trigger, { isLoading: isRefreshLoading }] =
    useLazyGetRefreshedChargerDetailsQuery();

  // ---------------- Handlers
  const handleRefresh = () => {
    trigger(hardwareId as string).then((result) => {
      if (result.isSuccess) {
        setChargerDetails(result.data as ChargerDetailsModel);
        showSnackbar('success', t(`chargingHardwareDetailsSnackbar.success`));
      }
      if (result.isError) {
        const errorName = getApiErrorMessage(result.error);
        showSnackbar('error', t(`errorCodes.${errorName}`));
      }
    });
  };

  // ---------------- useEffect
  useEffect(() => {
    if (charger) {
      setChargerDetails(charger);
    }
  }, [charger]);

  // ---------------- Logo
  const VendorInfo = usePersistedVendorInfo(chargerDetails?.staticData.vendor);

  // ---------------- Error
  if (isError) return <ErrorPage />;

  // ---------------- Loader
  if (isRefreshLoading || isGetDetailsLoading || !chargerDetails)
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
        location="/charging-hardware"
        logo={VendorInfo.Icon}
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
          <ChargerIcon />
        </Box>
        {/* -------------------------- Display name -------------------------- */}
        <Typography
          fontWeight={700}
          fontSize={ui_vars.font_size.xl}
          lineHeight={'3.2rem'}
          textAlign={'center'}
        >
          {chargerDetails?.staticData.name}
        </Typography>
        {/* -------------------------- Charger status/state -------------------------- */}
        {chargerDetails.chargeState.chargingState ? (
          <StatusChip status={chargerDetails?.chargeState.chargingState} />
        ) : null}
        {/* -------------------------- Detail cards -------------------------- */}
        <DoubleDetailCard
          firstElement={{
            icon: PowerIcon,
            unit: t(`unit.kw`),
            label: t(`chargerDetails.${ChargerDetail.CHARGE_POWER}`),
            value: chargerDetails?.chargeState.chargeRate,
          }}
          secondElement={{
            icon: MaxChargeIcon,
            unit: t(`unit.a`),
            label: t(`chargerDetails.${ChargerDetail.CHARGE_MAX_CURRENT}`),
            value: chargerDetails?.chargeState.chargeCurrentMax,
          }}
        />
        <DetailCard
          label={t('activePhase')}
          value={
            chargerDetails.chargeState.activePhases
              ? `${chargerDetails.chargeState.activePhases}`
              : ''
          }
          unit={
            chargerDetails?.chargeState?.activePhases
              ? t(`phaseConnection`)
              : ''
          }
          icon={ActivePhaseIcon}
        />
      </Box>
      <FooterWrapper>
        <DeleteButton
          onClick={() => setIsDeleteModalOpen(true)}
          title={t('deleteButton')}
        />
      </FooterWrapper>

      {/* -------------------------- Delete Modal -------------------------- */}

      <DeleteChargingHardwareDialog
        open={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
        }}
        chargerId={charger?.id || ''}
      />
    </>
  );
};
