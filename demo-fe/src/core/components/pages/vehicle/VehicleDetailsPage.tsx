// ---------------------------------------- IMPORTS ---------------------------------------- //
import { Box, Card, useTheme, Typography } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { StatusChip } from './StatusChip';
import RefreshIcon from '../../shared/assets/icons/refresh.svg?react';
import VinIcon from '../../shared/assets/vehicle/details/vin.svg?react';
import OdometerIcon from '../../shared/assets/vehicle/details/odometer.svg?react';
import { NavigationHeader } from '../../shared/header/NavigationHeader';
import {
  useLazyGetRefreshedVehicleDetailsQuery,
  useGetVehicleDetailsQuery,
  useGetVehicleImageQuery,
  useGetVehicleCommandsQuery,
  useStartVehicleChargeCommandMutation,
  useStopVehicleChargeCommandMutation,
} from '../../../../store/vehicle/vehicleApi';
import { VehicleDetailModel } from '../../../../store/vehicle/details/vehicleModel';
import { Loader } from '../../shared/loader/Loader';
import VehicleHighLightedImage from '../../shared/assets/vehicle/vehicleHighlighted.png';
import { EventSourcePolyfill } from 'event-source-polyfill';
import { VehicleDetailDto } from '../../../../store/vehicle/details/vehicleDto';
import { vehicleDetailNormalizer } from '../../../../store/vehicle/details/vehicleNormalizer';
import { environment } from '../../../../environment';
import BatteryHeaterIcon from '../../shared/assets/vehicle/details/battery-heater.svg?react';
import ChargingSpeedIcon from '../../shared/assets/vehicle/details/charging-speed.svg?react';
import CurrentTemperatureIcon from '../../shared/assets/vehicle/details/current-temperature.svg?react';
import EstimatedRangeIcon from '../../shared/assets/vehicle/details/estimated-range.svg?react';
import HeatingCoolingIcon from '../../shared/assets/vehicle/details/heating-cooling.svg?react';
import TargetTemperatureIcon from '../../shared/assets/vehicle/details/target-temperature.svg?react';
import {
  DoubleDetailCard,
  EMPTY_VALUE_PLACEHOLDER,
} from '../../shared/components/DoubleDetailCard';
import { isValueValid } from '../../../../store/util/isValueValid';
import { FooterWrapper } from '../../shared/wrappers/FooterWrapper';
import { DeleteButton } from '../../shared/components/DeleteButton';
import { DeleteVehicleDialog } from './DeleteVehicleDialog';
import { showSnackbar } from '../../shared/snackbar/snackbarUtils';
import { ChargingVehicleButton } from './ChargingVehicleButton';
import { ChargingButtonState } from './chargingButtonStateEnum';
import { AnimatedBatteryCard } from '../../shared/components/AnimatedBatteryCard';
import { PowerStateEnum } from '../../../../store/vehicle/enums/PowerState';
import { usePersistedVendorInfo } from '../../../hooks/usePersistedVendorInfo';
import { getApiErrorMessage } from '../../../../store/util/getApiErrorMessage';

enum VehicleDetail {
  BATTERY_HEATER = 'BATTERY_HEATER',
  CHARGING_SPEED = 'CHARGING_SPEED',
  CURRENT_TEMPERATURE = 'CURRENT_TEMPERATURE',
  ESTIMATED_RANGE = 'ESTIMATED_RANGE',
  HEATING_COOLING = 'HEATING_COOLING',
  TARGET_TEMPERATURE = 'TARGET_TEMPERATURE',
}

// ---------------------------------------- COMPONENT ---------------------------------------- //
export const VehicleDetailsPage = () => {
  const { t } = useTranslation();
  const { palette, ui_vars } = useTheme();
  const { vehicleId } = useParams<{ vehicleId: string }>();

  // ---------------- States
  const [token, setToken] = useState(
    `Bearer ${localStorage.getItem('idToken')}`
  );

  const [vehicleDetails, setVehicleDetails] =
    useState<VehicleDetailModel | null>(null);
  const [buttonState, setButtonState] = useState<'START' | 'STOP' | 'PENDING'>(
    'START'
  );
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const vendorInfo = usePersistedVendorInfo(vehicleDetails?.manufacturer);

  const { data: vehicleCommands } = useGetVehicleCommandsQuery(
    vehicleId || '',
    { skip: !vehicleId }
  );

  useEffect(() => {
    if (vehicleDetails?.stateOfCharge.powerStateId === 'CHARGING') {
      setButtonState('STOP');
    }
  }, [vehicleDetails?.stateOfCharge.powerStateId]);

  useEffect(() => {
    if (vehicleCommands && vehicleCommands?.length !== 0) {
      const lastElement = vehicleCommands[vehicleCommands.length - 1];
      if (lastElement.state === 'PENDING') {
        setButtonState('PENDING');
      }
    }
  }, [vehicleCommands]);

  useEffect(() => {
    const eventSource = new EventSourcePolyfill(
      `${environment.demoAppServiceUrl}/sse/vehicles`,
      {
        headers: {
          Authorization: token,
        },
      }
    );

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleEventSourceError = (error: any) => {
      if (error.status === 401) {
        // Token expired, refresh token and reconnect
        refreshAuthToken();
      }
    };

    const refreshAuthToken = () => {
      const newToken = `Bearer ${localStorage.getItem('idToken')}`;
      setToken(newToken);
    };

    eventSource.onmessage = (event) => {
      const messageEvent = JSON.parse(event.data);

      if (messageEvent.type === 'vehicle.update') {
        const newDetailsDto = messageEvent.data as VehicleDetailDto;
        const normalizedDetails = vehicleDetailNormalizer(newDetailsDto);
        if (vehicleId === normalizedDetails.vehicleDatabaseId) {
          setVehicleDetails(normalizedDetails);
        }
      }

      if (messageEvent.type === 'vehicle.command') {
        if (
          messageEvent.data.type === 'CHARGING_START' &&
          messageEvent.data.state === 'FAILED'
        ) {
          setButtonState('START');
          showSnackbar('error', t('chargingCommands.startFailed'));
        }

        if (
          messageEvent.data.type === 'CHARGING_START' &&
          messageEvent.data.state === 'EXECUTED'
        ) {
          setButtonState('STOP');
          showSnackbar('success', t('chargingCommands.startExecuted'));
        }

        if (
          messageEvent.data.type === 'CHARGING_STOP' &&
          messageEvent.data.state === 'FAILED'
        ) {
          setButtonState('STOP');
          showSnackbar('error', t('chargingCommands.stopFailed'));
        }
        if (
          messageEvent.data.type === 'CHARGING_STOP' &&
          messageEvent.data.state === 'EXECUTED'
        ) {
          setButtonState('START');
          showSnackbar('success', t('chargingCommands.stopExecuted'));
        }
      }
    };

    eventSource.onerror = handleEventSourceError;

    return () => {
      eventSource.close();
    };
  }, [t, token, vehicleId]);

  const { data: vehicle, isLoading: isGetDetailsLoading } =
    useGetVehicleDetailsQuery(vehicleId as string, {});

  const [trigger, { isLoading: isRefreshLoading }] =
    useLazyGetRefreshedVehicleDetailsQuery();

  const { data: vehicleImage } = useGetVehicleImageQuery(vehicleId || '', {
    skip: vehicleId === '',
  });

  const handleRefresh = () => {
    trigger(vehicleId as string).then((result) => {
      if (result.isSuccess) {
        setVehicleDetails(result.data as VehicleDetailModel);
        showSnackbar('success', t(`detailsSnackbar.success`));
      }
      if (result.isError) {
        showSnackbar('error', t(`detailsSnackbar.primary`));
      }
    });
  };

  useEffect(() => {
    if (vehicle) {
      setVehicleDetails(vehicle);
    }
  }, [vehicle]);

  const [vehicleCommandStart] = useStartVehicleChargeCommandMutation();

  const [vehicleCommandStop] = useStopVehicleChargeCommandMutation();

  const handleVehicleCommand = useCallback(
    (command: 'CHARGING_START' | 'CHARGING_STOP') => {
      if (!vehicleId) {
        return;
      }
      if (command === 'CHARGING_START') {
        return vehicleCommandStart({ vehicleId: vehicleId })
          .unwrap()
          .then(() => {})
          .catch((error) => {
            const errorName = getApiErrorMessage(error);
            showSnackbar('error', t(`errorCodes.${errorName}`));
          });
      }

      if (command === 'CHARGING_STOP') {
        return vehicleCommandStop({ vehicleId: vehicleId })
          .unwrap()
          .then(() => {})
          .catch((error) => {
            const errorName = getApiErrorMessage(error);
            showSnackbar('error', t(`errorCodes.${errorName}`));
          });
      }
    },
    [vehicleId, vehicleCommandStart, t, vehicleCommandStop]
  );

  if (isRefreshLoading || isGetDetailsLoading || !vehicleDetails)
    return <Loader />;

  return (
    <>
      {/* -------------------------- Header -------------------------- */}
      <NavigationHeader
        action={{
          icon: RefreshIcon,
          onClick: handleRefresh,
        }}
        location="/vehicles"
      />

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          p: ui_vars.other.page_spacing,
          gap: 6,
          height: `calc(100dvh - ${ui_vars.other.header_height})`,
          overflow: 'auto',
          pb: `calc(${ui_vars.other.footer_height} + 2rem)`,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 4,
          }}
        >
          <Box display={'flex'} alignItems={'center'} gap={3}>
            {/* -------------------------- Manufacturer -------------------------- */}
            {vendorInfo.Icon}

            <Typography
              fontWeight={500}
              fontSize={ui_vars.font_size.m}
              lineHeight={1}
              textTransform={'capitalize'}
            >
              {vendorInfo.name}
            </Typography>

            {/* -------------------------- Model -------------------------- */}
            {vehicleDetails?.model && (
              <>
                <Box
                  sx={{
                    width: '1px',
                    height: '2.4rem',
                    background: palette.common.vertical_separator,
                  }}
                ></Box>

                <Typography
                  fontWeight={500}
                  fontSize={ui_vars.font_size.m}
                  lineHeight={1}
                >
                  {vehicleDetails.model}
                </Typography>
              </>
            )}
          </Box>

          {/* -------------------------- Display name -------------------------- */}
          <Typography
            fontWeight={700}
            fontSize={ui_vars.font_size.xl}
            lineHeight={'3.2rem'}
          >
            {vehicleDetails.vehicleName}
          </Typography>
        </Box>

        {/* -------------------------- Car image -------------------------- */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flex: 'none',
            overflow: 'hidden',
            width: 'calc(100% - 2rem)',
            height: '150px',
            borderRadius: 3,
          }}
        >
          {vehicleImage ? (
            <img src={vehicleImage} alt="vehicle" height={150} />
          ) : (
            <img
              src={VehicleHighLightedImage}
              alt="vehicle"
              style={{ maxHeight: '100%' }}
            />
          )}
        </Box>

        {/* -------------------------- Status chip -------------------------- */}
        <StatusChip status={vehicleDetails.stateOfCharge.powerStateId} />
        <ChargingVehicleButton
          onClick={() => {
            if (buttonState === 'START') {
              handleVehicleCommand('CHARGING_START');
              setButtonState('PENDING');
            }
            if (buttonState === 'STOP') {
              handleVehicleCommand('CHARGING_STOP');
              setButtonState('PENDING');
            }
          }}
          state={ChargingButtonState[buttonState]}
          disabled={vehicleDetails.stateOfCharge.powerStateId === 'UNPLUGGED'}
        />

        <AnimatedBatteryCard
          charging={
            vehicleDetails.stateOfCharge.powerStateId ===
            PowerStateEnum.CHARGING
          }
          stateOfCharge={vehicleDetails.stateOfCharge.stateOfCharge}
          chargeLimitMax={vehicleDetails.stateOfCharge.chargeLimitMax}
          chargeLimitMin={vehicleDetails.stateOfCharge.chargeLimitMin}
        />

        <Card
          sx={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-around',
            gap: 4,
            p: 3,
          }}
        >
          <Box
            sx={{
              width: '45%',
              display: 'flex',
              alignItems: 'center',
              gap: 2,
            }}
          >
            {/* -------------------------- VIN -------------------------- */}
            <VinIcon />

            <Typography
              fontWeight={500}
              fontSize={ui_vars.font_size.xs}
              lineHeight={'1.8rem'}
              textTransform={'uppercase'}
            >
              {vehicleDetails.vin}
            </Typography>
          </Box>

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
                height: '2rem',
                background: palette.common.vertical_separator,
              }}
            ></Box>
          </Box>

          <Box
            sx={{
              width: '45%',
              display: 'flex',
              alignItems: 'center',
              gap: 2,
            }}
          >
            {/* -------------------------- Odometer -------------------------- */}
            <OdometerIcon />

            <Typography
              fontWeight={500}
              fontSize={ui_vars.font_size.xs}
              lineHeight={'1.8rem'}
            >
              {isValueValid(vehicleDetails.odometer)
                ? `${vehicleDetails.odometer}${t(`unit.km`)}`
                : EMPTY_VALUE_PLACEHOLDER}
            </Typography>
          </Box>
        </Card>

        {/* -------------------------- Details cards -------------------------- */}

        <DoubleDetailCard
          firstElement={{
            icon: EstimatedRangeIcon,
            label: t(`details.${VehicleDetail.ESTIMATED_RANGE}`),
            value: vehicleDetails?.stateOfCharge?.estimatedRange,
            unit: t(`unit.km`),
          }}
          secondElement={{
            icon: ChargingSpeedIcon,
            label: t(`details.${VehicleDetail.CHARGING_SPEED}`),
            value: vehicleDetails?.stateOfCharge?.chargeSpeed,
            unit: t(`unit.kw`),
          }}
        />

        <DoubleDetailCard
          firstElement={{
            icon: CurrentTemperatureIcon,
            label: t(`details.${VehicleDetail.CURRENT_TEMPERATURE}`),
            value: vehicleDetails?.climateState?.temperatureCurrent,
            unit: t(`unit.celsius`),
          }}
          secondElement={{
            icon: TargetTemperatureIcon,
            label: t(`details.${VehicleDetail.TARGET_TEMPERATURE}`),
            value: vehicleDetails?.climateState?.temperatureTarget,
            unit: t(`unit.celsius`),
          }}
        />

        <DoubleDetailCard
          firstElement={{
            icon: HeatingCoolingIcon,
            label: t(`details.${VehicleDetail.HEATING_COOLING}`),
            value: t(
              `detailsBoolean.${vehicleDetails.climateState.isClimateOn}Value`
            ),
          }}
          secondElement={{
            icon: BatteryHeaterIcon,
            label: t(`details.${VehicleDetail.BATTERY_HEATER}`),
            value: t(
              `detailsBoolean.${vehicleDetails.climateState.isBatteryHeaterOn}Value`
            ),
          }}
        />
      </Box>
      <FooterWrapper>
        <DeleteButton
          onClick={() => setIsDeleteModalOpen(true)}
          title={t('deleteButton')}
        />
      </FooterWrapper>

      {/* -------------------------- Delete Modal -------------------------- */}

      <DeleteVehicleDialog
        open={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
        }}
        vehicleId={vehicleDetails?.vehicleDatabaseId || ''}
      />
    </>
  );
};
