import { Box, Typography, useTheme } from '@mui/material';
import { FooterWrapper } from '../../shared/wrappers/FooterWrapper';
import { useTranslation } from 'react-i18next';
import { SelectableHomePowerCard } from './SelectableHomePowerCard';
import {
  Controller,
  FormProvider,
  SubmitHandler,
  useForm,
} from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { selectHomePowerFormValidationSchema } from './selectHomePowerFormValidationSchema';
import { HomePowerType } from '../../../../store/home-power/enums/homePowerTypeEnum';
import { useNavigate } from 'react-router-dom';
import {
  useLinkBatteryMutation,
  useLinkInverterMutation,
  useLinkMeterMutation,
} from '../../../../store/link/linkApi';
import { HomePowerExternalModelExtended } from '../../../../store/home-power/useVendorAccountHomePowerMerged';

export interface SelectHomePowerFormData {
  vendor: string;
  externalBatteries: string[];
  externalPvInverters: string[];
  externalMeters: string[];
}

interface SelectHomePowerFormProps {
  vendorAccountId: string;
  homePower: HomePowerExternalModelExtended[];
}

export const SelectHomePowerForm = ({
  vendorAccountId,
  homePower,
}: SelectHomePowerFormProps) => {
  const [t] = useTranslation();
  const { ui_vars } = useTheme();
  const navigate = useNavigate();

  const [linkBattery, { isLoading: isLinkingBattery }] =
    useLinkBatteryMutation();
  const [linkInverter, { isLoading: isLinkingInverter }] =
    useLinkInverterMutation();
  const [linkMeter, { isLoading: isLinkingMeter }] = useLinkMeterMutation();

  const selectHomePowerFormDefaultValues: SelectHomePowerFormData = {
    vendor: homePower[0].manufacturer,
    externalBatteries: [],
    externalPvInverters: [],
    externalMeters: [],
  };

  const methods = useForm<SelectHomePowerFormData>({
    mode: 'onChange',
    defaultValues: selectHomePowerFormDefaultValues,
    resolver: yupResolver(selectHomePowerFormValidationSchema),
  });

  const {
    control,
    handleSubmit,
    reset: resetForm,
    formState: { isDirty, isValid },
  } = methods;

  const onSubmit: SubmitHandler<SelectHomePowerFormData> = (data) => {
    Promise.all([
      data.externalPvInverters.length > 0 &&
        linkInverter({
          vendorAccountId,
          externalPvInverters: data.externalPvInverters,
        }).unwrap(),
      data.externalBatteries.length > 0 &&
        linkBattery({
          vendorAccountId,
          externalBatteries: data.externalBatteries,
        }).unwrap(),
      data.externalMeters.length > 0 &&
        linkMeter({
          vendorAccountId,
          externalMeters: data.externalMeters,
        }).unwrap(),
    ])
      .then(() => {
        // If both mutations are successful
        navigate('/home-power/success');
      })
      .catch(() => {
        // If any mutation fails
        navigate('/error');
      });

    resetForm();
  };

  return (
    <FormProvider {...methods}>
      <Typography
        data-testid={`selectHomePowerTitle`}
        fontWeight={700}
        fontSize={ui_vars.font_size.l}
        sx={{
          p: 6,
          textAlign: 'center',
        }}
      >
        {t('selectHomePowerTitle')}
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
          {homePower.map((homePowerDevice) => {
            if (homePowerDevice.type === HomePowerType.BATTERY) {
              return (
                <Controller
                  key={homePowerDevice.externalId + 'battery'}
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { onChange, value } }) => {
                    return (
                      <SelectableHomePowerCard
                        homePowerId={homePowerDevice.externalId}
                        type={homePowerDevice.type}
                        manufacturer={homePowerDevice.manufacturer}
                        siteName={homePowerDevice.siteName}
                        homePowerName={
                          homePowerDevice.homePowerName ||
                          homePowerDevice.model ||
                          ''
                        }
                        selected={
                          value.includes(homePowerDevice.externalId) ||
                          homePowerDevice.linked
                        }
                        disabled={
                          homePowerDevice.linked ||
                          isLinkingBattery ||
                          isLinkingInverter
                        }
                        onClick={(homePowerId) => {
                          const isSelected = value.includes(homePowerId);

                          if (isSelected) {
                            const updatedHomePower = value.filter(
                              (id) => id !== homePowerId
                            );

                            onChange(updatedHomePower);
                          } else {
                            onChange([...value, homePowerId]);
                          }
                        }}
                      />
                    );
                  }}
                  name={'externalBatteries'}
                />
              );
            }

            if (homePowerDevice.type === HomePowerType.PV_INVERTER) {
              return (
                <Controller
                  key={homePowerDevice.externalId + 'inverter'}
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { onChange, value } }) => {
                    return (
                      <SelectableHomePowerCard
                        homePowerId={homePowerDevice.externalId}
                        type={homePowerDevice.type}
                        manufacturer={homePowerDevice.manufacturer}
                        siteName={homePowerDevice.siteName}
                        homePowerName={
                          homePowerDevice.homePowerName ||
                          homePowerDevice.model ||
                          ''
                        }
                        selected={
                          value.includes(homePowerDevice.externalId) ||
                          homePowerDevice.linked
                        }
                        disabled={
                          homePowerDevice.linked ||
                          isLinkingBattery ||
                          isLinkingInverter
                        }
                        onClick={(homePowerId) => {
                          const isSelected = value.includes(homePowerId);

                          if (isSelected) {
                            const updatedHomePower = value.filter(
                              (id) => id !== homePowerId
                            );

                            onChange(updatedHomePower);
                          } else {
                            onChange([...value, homePowerId]);
                          }
                        }}
                      />
                    );
                  }}
                  name={'externalPvInverters'}
                />
              );
            }

            if (homePowerDevice.type === HomePowerType.METER) {
              return (
                <Controller
                  key={homePowerDevice.externalId + 'meter'}
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { onChange, value } }) => {
                    return (
                      <SelectableHomePowerCard
                        homePowerId={homePowerDevice.externalId}
                        type={homePowerDevice.type}
                        manufacturer={homePowerDevice.manufacturer}
                        siteName={homePowerDevice.siteName}
                        homePowerName={
                          homePowerDevice.homePowerName ||
                          homePowerDevice.model ||
                          ''
                        }
                        selected={
                          value.includes(homePowerDevice.externalId) ||
                          homePowerDevice.linked
                        }
                        disabled={
                          homePowerDevice.linked ||
                          isLinkingBattery ||
                          isLinkingInverter ||
                          isLinkingMeter
                        }
                        onClick={(homePowerId) => {
                          const isSelected = value.includes(homePowerId);

                          if (isSelected) {
                            const updatedHomePower = value.filter(
                              (id) => id !== homePowerId
                            );

                            onChange(updatedHomePower);
                          } else {
                            onChange([...value, homePowerId]);
                          }
                        }}
                      />
                    );
                  }}
                  name={'externalMeters'}
                />
              );
            }
          })}
        </Box>

        <FooterWrapper>
          <LoadingButton
            variant="contained"
            fullWidth
            disabled={!isDirty || !isValid}
            loading={isLinkingBattery || isLinkingInverter}
            type="submit"
          >
            {t('connectHomePower')}
          </LoadingButton>
        </FooterWrapper>
      </form>
    </FormProvider>
  );
};
