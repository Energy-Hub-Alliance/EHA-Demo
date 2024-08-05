import {
  Manufacturer,
  vehicleManufacturersToIcons,
} from '../../shared/mappers/vehicleManufacturersToIcons';
import {
  connectApi,
  useGetAvailableVendorsQuery,
  useGetConnectVehiclePathQuery,
} from '../../../../store/connect/connectApi';
import { Loader } from '../../shared/loader/Loader';
import { SelectVendorList, Vendor } from './SelectVendorList';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Box,
  Button,
  Dialog,
  IconButton,
  Snackbar,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import CloseIcon from '../../shared/assets/icons/close.svg?react';
import { NavigationHeader } from '../../shared/header/NavigationHeader';
import { useAppDispatch } from '../../../../store/store';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';

const vinNumberValidationSchema = yup.object().shape({
  vinNumber: yup
    .string()
    .required('requiredField')
    .matches(/^[A-HJ-NPR-Z0-9]{17}$/, 'vinErrorMessage'),
});

export const SelectVehicleVendor = () => {
  const [t] = useTranslation();
  const { palette, ui_vars } = useTheme();
  const [selectedVendor, setSelectedVendor] = useState<string>();
  const [selectedVin, setSelectedVin] = useState<string>();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const dispatch = useAppDispatch();

  const methods = useForm<{ vinNumber: string }>({
    mode: 'onChange',
    defaultValues: { vinNumber: '' },
    resolver: yupResolver(vinNumberValidationSchema),
  });

  const {
    control,
    reset: resetForm,
    formState: { isValid, errors },
    getValues,
  } = methods;

  const { data: availableVendors, isLoading: isLoadingVendors } =
    useGetAvailableVendorsQuery();

  const MOCK_UNAVAILABLE_VENDORS = ['AUDI', 'VOLKSWAGEN'];

  const chosenVehicle = availableVendors?.vehicles.find(
    (vehicle) => vehicle.id === selectedVendor
  );

  const isVinRequired = chosenVehicle?.required.includes('VIN');

  const shouldSkipQuery = isVinRequired && !selectedVin ? true : false;

  const {
    data: redirectUrl,
    isError: isRedirectError,
    error: redirectError,
  } = useGetConnectVehiclePathQuery(
    { vendor: selectedVendor, vin: selectedVin },
    { skip: !selectedVendor || shouldSkipQuery }
  );

  useEffect(() => {
    if (redirectError) {
      setIsSnackbarOpen(true);
    }
  }, [redirectError]);

  useEffect(() => {
    if (isVinRequired && !selectedVin) {
      setIsDialogOpen(true);
    }
  }, [isVinRequired, selectedVendor, selectedVin]);

  const handleConnectClick = () => {
    const inputData = getValues();
    setSelectedVin(inputData.vinNumber);
  };

  useEffect(() => {
    if (redirectUrl?.url) {
      window.location.assign(redirectUrl.url);
    }

    return () => {
      setSelectedVendor('');
      dispatch(connectApi.util.resetApiState());
    };
  }, [dispatch, redirectUrl]);

  const availableVehicleVendors = availableVendors?.vehicles?.map(
    (availableVendor) => {
      const Icon = <img height={24} src={availableVendor.logoUrl} />;
      return { name: availableVendor.id, Icon } as Vendor;
    }
  );

  const UNAVAILABLE_VEHICLE_VENDORS = MOCK_UNAVAILABLE_VENDORS.map(
    (unavailableVendor) => {
      const Icon =
        vehicleManufacturersToIcons[unavailableVendor as Manufacturer];
      return { name: unavailableVendor, Icon: <Icon /> } as Vendor;
    }
  );

  function getError() {
    if (isRedirectError && redirectError && 'data' in redirectError) {
      const fetchError = redirectError as FetchBaseQueryError;
      if (
        fetchError.data &&
        typeof fetchError.data === 'object' &&
        'errorCode' in fetchError.data
      ) {
        const errorCode = fetchError.data.errorCode as string;
        return t(`errorCodes.${errorCode}`);
      }
    }
  }

  if (isLoadingVendors) return <Loader />;

  return (
    <>
      <NavigationHeader location="/vehicles" />
      <SelectVendorList
        title={t('vehicleManufacturersTitle')}
        subtitle={t('vehicleManufacturersSubtitle')}
        availableVendors={availableVehicleVendors ?? []}
        unavailableVendors={UNAVAILABLE_VEHICLE_VENDORS}
        onClick={(vendorName) => setSelectedVendor(vendorName)}
        displayName
      />
      <Dialog
        open={isDialogOpen}
        fullScreen
        sx={{
          '& .MuiPaper-root': {
            background: palette.background?.default,
            p: ui_vars.other.page_spacing,
          },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
          }}
        >
          <IconButton
            onClick={() => {
              setSelectedVin('');
              setSelectedVendor('');
              resetForm();
              setIsDialogOpen(false);
            }}
            size="small"
            sx={{ alignSelf: 'self-start', mb: 5 }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: '100%',
          }}
        >
          <Box>
            <Typography
              fontWeight={700}
              fontSize={ui_vars.font_size.l}
              sx={{
                textAlign: 'center',
                mb: 6,
              }}
            >
              {t('vinTitle')}
            </Typography>
            <Controller
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, onBlur, value } }) => {
                return (
                  <TextField
                    sx={{ width: '100%' }}
                    type="text"
                    value={value}
                    required
                    label={t('vin')}
                    onChange={onChange}
                    onBlur={onBlur}
                    error={Boolean(errors.vinNumber)}
                    helperText={
                      errors.vinNumber?.message
                        ? t(`${errors.vinNumber.message}`)
                        : ''
                    }
                  />
                );
              }}
              name={'vinNumber'}
            />
          </Box>
          <Button
            disabled={!isValid}
            variant="contained"
            fullWidth
            onClick={handleConnectClick}
          >
            {t('connectButton')}
          </Button>
        </Box>
      </Dialog>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        open={isSnackbarOpen}
        onClose={() => {
          setSelectedVin('');
          setIsSnackbarOpen(false);
        }}
        autoHideDuration={6000}
        action={
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={() => {
              setSelectedVin('');
              setIsSnackbarOpen(false);
            }}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        }
        message={getError()}
        sx={{
          '& > div': {
            backgroundColor: palette.primary?.main,
            color: palette.primary.contrastText,
            fontSize: ui_vars.font_size.m,
            fontWeight: 500,
          },
        }}
      />
    </>
  );
};
