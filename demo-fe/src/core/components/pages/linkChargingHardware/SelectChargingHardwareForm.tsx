import { Box, Typography, useTheme } from '@mui/material';
import { FooterWrapper } from '../../shared/wrappers/FooterWrapper';
import { useTranslation } from 'react-i18next';
import {
  Controller,
  FormProvider,
  SubmitHandler,
  useForm,
} from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import { LoadingButton } from '@mui/lab';
import { useLinkChargerMutation } from '../../../../store/link/linkApi';
import { ChargingHardwareExternalModel } from '../../../../store/link/chargingHardwareExternalModel';
import { SelectableChargingHardwareCard } from './SelectableChargingHardwareCard';
import { selectChargingHardwareFormValidationSchema } from './selectChargingHardwareFormValidationSchema';

export interface SelectChargersFormData {
  vendor: string;
  externalChargers: string[];
}

interface SelectHvacsFormProps {
  vendorAccountId: string;
  chargers: ChargingHardwareExternalModel[];
}

export const SelectChargingHardwareForm = ({
  vendorAccountId,
  chargers,
}: SelectHvacsFormProps) => {
  const [t] = useTranslation();
  const { ui_vars } = useTheme();
  const navigate = useNavigate();

  const [linkCharger, { isLoading: isLinking }] = useLinkChargerMutation();

  const selectChargingHardwareFormDefaultValues: SelectChargersFormData = {
    vendor: chargers[0].manufacturer,
    externalChargers: [],
  };

  const methods = useForm<SelectChargersFormData>({
    mode: 'onChange',
    defaultValues: selectChargingHardwareFormDefaultValues,
    resolver: yupResolver(selectChargingHardwareFormValidationSchema),
  });

  const {
    control,
    handleSubmit,
    reset: resetForm,
    formState: { isDirty, isValid },
  } = methods;

  const onSubmit: SubmitHandler<SelectChargersFormData> = (data) => {
    linkCharger({
      vendorAccountId,
      body: data,
    })
      .unwrap()
      .then(() => {
        navigate('/charging-hardware/success');
      })
      .catch(() => {
        navigate('/error');
      });
    resetForm();
  };

  return (
    <FormProvider {...methods}>
      <Typography
        data-testid={`selectChargingHardwareTitle`}
        fontWeight={700}
        fontSize={ui_vars.font_size.l}
        sx={{
          p: 6,
          textAlign: 'center',
        }}
      >
        {t('selectChargingHardwareTitle')}
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
          {chargers.map((charger) => (
            <Controller
              key={charger.externalId}
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => {
                return (
                  <SelectableChargingHardwareCard
                    chargerId={charger.externalId}
                    manufacturer={charger.manufacturer}
                    chargerName={charger.chargerName || charger.model || ''}
                    selected={
                      value.includes(charger.externalId) || charger.isLinked
                    }
                    disabled={charger.isLinked || isLinking}
                    onClick={(chargerId: string) => {
                      const isSelected = value.includes(chargerId);

                      if (isSelected) {
                        const updatedChargers = value.filter(
                          (id) => id !== chargerId
                        );
                        onChange(updatedChargers);
                      } else {
                        onChange([...value, chargerId]);
                      }
                    }}
                  />
                );
              }}
              name={'externalChargers'}
            />
          ))}
        </Box>

        <FooterWrapper>
          <LoadingButton
            variant="contained"
            fullWidth
            disabled={!isDirty || !isValid}
            loading={isLinking}
            type="submit"
          >
            {t('connectChargingHardware')}
          </LoadingButton>
        </FooterWrapper>
      </form>
    </FormProvider>
  );
};
