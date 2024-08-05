import { Box, Typography, useTheme } from '@mui/material';
import { FooterWrapper } from '../../shared/wrappers/FooterWrapper';
import { useTranslation } from 'react-i18next';
import { Manufacturer } from '../../shared/mappers/vehicleManufacturersToIcons';
import { SelectableVehicleCard } from './SelectableVehicleCard';
import {
  Controller,
  FormProvider,
  SubmitHandler,
  useForm,
} from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { selectVehiclesFormValidationSchema } from './selectVehiclesFormValidationSchema';
import { useLinkVehicleMutation } from '../../../../store/link/linkApi';
import { useNavigate } from 'react-router-dom';
import { LoadingButton } from '@mui/lab';
import { VehicleExternalModel } from '../../../../store/link/vehicleExternalModel';

export interface SelectVehiclesFormData {
  vendor: string;
  externalVehicles: string[];
}

interface SelectVehiclesFormProps {
  vendorAccountId: string;
  vehicles: VehicleExternalModel[];
}

export const SelectVehiclesForm = ({
  vendorAccountId,
  vehicles,
}: SelectVehiclesFormProps) => {
  const [t] = useTranslation();
  const { ui_vars } = useTheme();
  const navigate = useNavigate();

  const [linkVehicle, { isLoading: isLinking }] = useLinkVehicleMutation();

  const selectVehiclesFormDefaultValues: SelectVehiclesFormData = {
    vendor: vehicles[0].manufacturer,
    externalVehicles: [],
  };

  const methods = useForm<SelectVehiclesFormData>({
    mode: 'onChange',
    defaultValues: selectVehiclesFormDefaultValues,
    resolver: yupResolver(selectVehiclesFormValidationSchema),
  });

  const {
    control,
    handleSubmit,
    reset: resetForm,
    formState: { isDirty, isValid },
  } = methods;

  const onSubmit: SubmitHandler<SelectVehiclesFormData> = (data) => {
    linkVehicle({
      vendorAccountId,
      body: data,
    })
      .unwrap()
      .then(() => {
        navigate('/vehicles/success');
      })
      .catch(() => {
        navigate('/error');
      });
    resetForm();
  };

  return (
    <FormProvider {...methods}>
      <Typography
        data-testid={`selectVehicleTitle`}
        fontWeight={700}
        fontSize={ui_vars.font_size.l}
        sx={{
          p: 6,
          textAlign: 'center',
        }}
      >
        {t('selectVehicleTitle')}
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            rowGap: 4,
            width: '100%',
            p: 4,
            pb: `calc(${ui_vars.other.footer_height} + 2rem)`,
          }}
        >
          {vehicles.map((vehicle) => (
            <Controller
              key={vehicle.externalVehicleId}
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => {
                return (
                  <SelectableVehicleCard
                    vehicleId={vehicle.externalVehicleId}
                    manufacturer={vehicle.manufacturer as Manufacturer}
                    model={vehicle.vehicleName}
                    selected={
                      value.includes(vehicle.externalVehicleId) ||
                      vehicle.linked
                    }
                    disabled={vehicle.linked || isLinking}
                    onClick={(vehicleId) => {
                      const isSelected = value.includes(vehicleId);

                      if (isSelected) {
                        const updatedVehicles = value.filter(
                          (id) => id !== vehicleId
                        );
                        onChange(updatedVehicles);
                      } else {
                        onChange([...value, vehicleId]);
                      }
                    }}
                  />
                );
              }}
              name={'externalVehicles'}
            />
          ))}
        </Box>

        <FooterWrapper>
          <Box
            sx={{
              height: '100%',
              width: '100%',
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'center',
              px: 10,
            }}
          >
            <LoadingButton
              variant="contained"
              fullWidth
              disabled={!isDirty || !isValid}
              loading={isLinking}
              type="submit"
            >
              {t('connectVehicles')}
            </LoadingButton>
          </Box>
        </FooterWrapper>
      </form>
    </FormProvider>
  );
};
