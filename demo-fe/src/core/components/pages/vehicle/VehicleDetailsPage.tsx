// ---------------------------------------- IMPORTS ---------------------------------------- //
import {
  Box,
  Card,
  useTheme,
  Typography,
  Snackbar,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import {
  Manufacturer,
  vehicleManufacturersToIcons,
} from '../../shared/mappers/vehicleManufacturersToIcons';
import { StatusChip } from './StatusChip';
import { VehicleDetailsPairCard } from './VehicleDetailsPairCard';
import BatteryMaskSvg from '../../shared/assets/icons/battery-mask.svg';
import RefreshIcon from '../../shared/assets/icons/refresh.svg?react';
import VinIcon from '../../shared/assets/vehicle/details/vin.svg?react';
import OdometerIcon from '../../shared/assets/vehicle/details/odometer.svg?react';
import { NavigationHeader } from '../../shared/header/NavigationHeader';
import {
  useLazyGetRefreshedVehicleDetailsQuery,
  useGetVehicleDetailsQuery,
  useGetVehicleImageQuery,
} from '../../../../store/vehicle/vehicleApi';
import { VehicleModel } from '../../../../store/vehicle/vehicleModel';
import { Loader } from '../../shared/loader/Loader';
import VehicleHighLightedImage from '../../shared/assets/vehicle/vehicleHighlighted.png';
import { EventSourcePolyfill } from 'event-source-polyfill';
import { VehicleDto } from '../../../../store/vehicle/vehicleDto';
import { vehicleNormalizer } from '../../../../store/vehicle/vehicleNormalizer';
import { environment } from '../../../../environment';

// ---------------------------------------- COMPONENT ---------------------------------------- //
export const VehicleDetailsPage = () => {
  const { t } = useTranslation();
  const { palette, ui_vars } = useTheme();
  const { vehicleId } = useParams<{ vehicleId: string }>();

  const [token, setToken] = useState(
    `Bearer ${localStorage.getItem('idToken')}`
  );

  useEffect(() => {
    const eventSource = new EventSourcePolyfill(
      `${environment.demoAppServiceUrl}/sse`,
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
      const newDetailsDto = JSON.parse(event.data) as VehicleDto;
      const normalizedDetails = vehicleNormalizer(newDetailsDto);
      if (vehicleId === normalizedDetails.vehicleDatabaseId) {
        setVehicleDetails(normalizedDetails);
      }
    };

    eventSource.onerror = handleEventSourceError;

    return () => {
      eventSource.close();
    };
  }, [token, vehicleId]);

  const [snackbarState, setSnackbarState] = useState<{
    isOpen: boolean;
    status: 'primary' | 'success';
  }>({ isOpen: false, status: 'success' });
  const [vehicleDetails, setVehicleDetails] = useState<VehicleModel | null>(
    null
  );

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
        setVehicleDetails(result.data as VehicleModel);
        setSnackbarState({
          isOpen: true,
          status: 'success',
        });
      }
      if (result.isError) {
        setSnackbarState({
          isOpen: true,
          status: 'primary',
        });
      }
    });
  };

  useEffect(() => {
    if (vehicle) {
      setVehicleDetails(vehicle);
    }
  }, [vehicle]);

  if (isRefreshLoading || isGetDetailsLoading || !vehicleDetails)
    return <Loader />;

  const ManufacturerIcon =
    vehicleManufacturersToIcons[vehicleDetails.manufacturer as Manufacturer];

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
            <ManufacturerIcon
              style={{
                width: ui_vars.font_size.xl,
                height: ui_vars.font_size.xl,
              }}
            />

            <Typography
              fontWeight={500}
              fontSize={ui_vars.font_size.m}
              lineHeight={1}
              textTransform={'capitalize'}
            >
              {vehicleDetails.manufacturer.toLowerCase()}
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
            <img src={vehicleImage} alt="vehicle" height={250} />
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
              {`${vehicleDetails.odometer}km`}
            </Typography>
          </Box>
        </Card>

        <Card
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: ui_vars.other.page_spacing,
            width: '100%',
            py: '2.4rem',
          }}
        >
          {/* -------------------------- Battery percentage -------------------------- */}
          <Typography
            fontWeight={700}
            fontSize={ui_vars.font_size.xxl}
            lineHeight={'4.2rem'}
            color={palette.secondary.main}
          >
            {`${vehicleDetails.stateOfCharge.stateOfCharge}%`}
          </Typography>

          {/* -------------------------- Battery -------------------------- */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1.5,
            }}
          >
            <Card
              sx={{
                width: '9.5rem',
                height: '7rem',
                py: 3,
              }}
            >
              <Box
                sx={{
                  width: '6.4rem',
                  height: '4.5rem',
                  '&::before': {
                    content: '""',
                    display: 'block',
                    height: '100%',
                    width: `${vehicleDetails.stateOfCharge.stateOfCharge}%`,
                    background: palette.secondary.main,
                    mask: `url("${BatteryMaskSvg}") left / 6.4rem 4.5rem no-repeat`,
                  },
                }}
              ></Box>
            </Card>
            <Box
              sx={{
                width: '0.8rem',
                height: '3.6rem',
                background: palette.secondary.main,
                borderRadius: '0.8rem',
              }}
            ></Box>
          </Box>

          {/* -------------------------- Battery Min/Max -------------------------- */}
          <Box>
            <Typography
              fontWeight={500}
              fontSize={ui_vars.font_size.xs}
              lineHeight={'1.8rem'}
              color={palette.secondary.main}
              textTransform={'uppercase'}
            >
              <span
                style={{ color: palette.text?.primary, marginRight: '5px' }}
              >
                {t('min')}
              </span>
              {`${vehicleDetails.stateOfCharge.chargeLimitMin}%`}
            </Typography>

            <Typography
              fontWeight={500}
              fontSize={ui_vars.font_size.xs}
              lineHeight={'1.8rem'}
              color={palette.secondary.main}
              textTransform={'uppercase'}
            >
              <span
                style={{ color: palette.text?.primary, marginRight: '5px' }}
              >
                {t('max')}
              </span>
              {`${vehicleDetails.stateOfCharge.chargeLimitMax}%`}
            </Typography>
          </Box>
        </Card>

        {/* -------------------------- Details cards -------------------------- */}
        <VehicleDetailsPairCard
          firstDetail={{
            vehicleDetail: 'ESTIMATED_RANGE',
            detailValue: vehicleDetails.stateOfCharge.estimatedRange,
          }}
          secondDetail={{
            vehicleDetail: 'CHARGING_SPEED',
            detailValue: vehicleDetails.stateOfCharge.chargeSpeed,
          }}
        />

        <VehicleDetailsPairCard
          firstDetail={{
            vehicleDetail: 'CURRENT_TEMPERATURE',
            detailValue: vehicleDetails.climateState.temperatureCurrent,
          }}
          secondDetail={{
            vehicleDetail: 'TARGET_TEMPERATURE',
            detailValue: vehicleDetails.climateState.temperatureTarget,
          }}
        />

        <VehicleDetailsPairCard
          firstDetail={{
            vehicleDetail: 'HEATING_COOLING',
            detailValue: vehicleDetails.climateState.isClimateOn,
          }}
          secondDetail={{
            vehicleDetail: 'BATTERY_HEATER',
            detailValue: vehicleDetails.climateState.isBatteryHeaterOn,
          }}
        />
      </Box>

      {/* -------------------------- Snackbar -------------------------- */}
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        open={snackbarState.isOpen}
        onClose={() => {
          setSnackbarState({ ...snackbarState, isOpen: false });
        }}
        autoHideDuration={6000}
        action={
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={() => {
              setSnackbarState({ ...snackbarState, isOpen: false });
            }}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        }
        message={t(`detailsSnackbar.${snackbarState.status}`)}
        sx={{
          '& > div': {
            backgroundColor: palette[snackbarState.status]?.main,
            color: palette[snackbarState.status]?.contrastText,
            fontSize: ui_vars.font_size.m,
            fontWeight: 500,
          },
        }}
      />
    </>
  );
};
