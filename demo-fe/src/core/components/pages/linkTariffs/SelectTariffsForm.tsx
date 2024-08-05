import { Box, Typography, useTheme } from '@mui/material';
import { FooterWrapper } from '../../shared/wrappers/FooterWrapper';
import { useTranslation } from 'react-i18next';
import { SelectableTariffsCard } from './SelectableTariffsCard';
import {
  Controller,
  FormProvider,
  SubmitHandler,
  useForm,
} from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import { LoadingButton } from '@mui/lab';
import { selectTariffsFormValidationSchema } from './selectTariffsFormValidationSchema';
import { SmartTarrifManufacturer } from '../../shared/mappers/smartTariffManufacturersToIcons';
import { TariffExternalModel } from '../../../../store/link/tariffExternalModel';
import { useLinkTariffMutation } from '../../../../store/link/linkApi';

export interface SelectTariffsFormData {
  vendor: string;
  externalTariffs: string[];
}

interface SelectTariffsFormProps {
  vendorAccountId: string;
  tariffs: TariffExternalModel[];
}

export const SelectTariffsForm = ({
  vendorAccountId,
  tariffs,
}: SelectTariffsFormProps) => {
  const [t] = useTranslation();
  const { ui_vars } = useTheme();
  const navigate = useNavigate();

  const [linkTariff, { isLoading: isLinking }] = useLinkTariffMutation();

  const selectTariffsFormDefaultValues: SelectTariffsFormData = {
    vendor: tariffs[0].manufacturer,
    externalTariffs: [],
  };

  const methods = useForm<SelectTariffsFormData>({
    mode: 'onChange',
    defaultValues: selectTariffsFormDefaultValues,
    resolver: yupResolver(selectTariffsFormValidationSchema),
  });

  const {
    control,
    handleSubmit,
    reset: resetForm,
    formState: { isDirty, isValid },
  } = methods;

  const onSubmit: SubmitHandler<SelectTariffsFormData> = (data) => {
    linkTariff({
      vendorAccountId,
      externalTariffs: data.externalTariffs,
    })
      .unwrap()
      .then(() => {
        navigate('/smart-tariffs/success');
      })
      .catch(() => {
        navigate('/error');
      });
    resetForm();
  };

  return (
    <FormProvider {...methods}>
      <Typography
        data-testid={`selectTariffTitle`}
        fontWeight={700}
        fontSize={ui_vars.font_size.l}
        sx={{
          p: 6,
          textAlign: 'center',
        }}
      >
        {t('selectTariffTitle')}
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
          {tariffs.map((tariff) => (
            <Controller
              key={tariff.externalId}
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => {
                return (
                  <SelectableTariffsCard
                    tariffId={tariff.externalId}
                    tariffName={tariff.tariffName}
                    manufacturer={
                      tariff.manufacturer as SmartTarrifManufacturer
                    }
                    selected={
                      value.includes(tariff.externalId) || tariff.linked
                    }
                    disabled={tariff.linked || isLinking}
                    onClick={(tariffId) => {
                      const isSelected = value.includes(tariffId);

                      if (isSelected) {
                        const updatedTariffs = value.filter(
                          (id) => id !== tariffId
                        );
                        onChange(updatedTariffs);
                      } else {
                        onChange([...value, tariffId]);
                      }
                    }}
                  />
                );
              }}
              name={'externalTariffs'}
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
              {t('connectTariffs')}
            </LoadingButton>
          </Box>
        </FooterWrapper>
      </form>
    </FormProvider>
  );
};
