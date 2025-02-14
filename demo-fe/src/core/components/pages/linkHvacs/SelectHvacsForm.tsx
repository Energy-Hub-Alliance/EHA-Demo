import { Box, Typography, useTheme } from '@mui/material';
import { FooterWrapper } from '../../shared/wrappers/FooterWrapper';
import { useTranslation } from 'react-i18next';
import { SelectableHvacsCard } from './SelectableHvacsCard';
import {
  Controller,
  FormProvider,
  SubmitHandler,
  useForm,
} from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import { LoadingButton } from '@mui/lab';
import { selectHvacsFormValidationSchema } from './selectHvacsFormValidationSchema';
import { useLinkHvacMutation } from '../../../../store/link/linkApi';
import { HvacExternalModel } from '../../../../store/link/hvacExternalModel';

export interface SelectHvacsFormData {
  vendor: string;
  externalHvacs: string[];
}

interface SelectHvacsFormProps {
  vendorAccountId: string;
  hvacs: HvacExternalModel[];
}

export const SelectHvacsForm = ({
  vendorAccountId,
  hvacs,
}: SelectHvacsFormProps) => {
  const [t] = useTranslation();
  const { ui_vars } = useTheme();
  const navigate = useNavigate();

  const [linkHvac, { isLoading: isLinking }] = useLinkHvacMutation();

  const selectHvacsFormDefaultValues: SelectHvacsFormData = {
    vendor: hvacs[0].manufacturer,
    externalHvacs: [],
  };

  const methods = useForm<SelectHvacsFormData>({
    mode: 'onChange',
    defaultValues: selectHvacsFormDefaultValues,
    resolver: yupResolver(selectHvacsFormValidationSchema),
  });

  const {
    control,
    handleSubmit,
    reset: resetForm,
    formState: { isDirty, isValid },
  } = methods;

  const onSubmit: SubmitHandler<SelectHvacsFormData> = (data) => {
    linkHvac({
      vendorAccountId,
      body: data,
    })
      .unwrap()
      .then(() => {
        navigate('/hvacs/success');
      })
      .catch(() => {
        navigate('/error');
      });
    resetForm();
  };

  return (
    <FormProvider {...methods}>
      <Typography
        data-testid={`selectHvacTitle`}
        fontWeight={700}
        fontSize={ui_vars.font_size.l}
        sx={{
          p: 6,
          textAlign: 'center',
        }}
      >
        {t('selectHvacTitle')}
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
          {hvacs.map((hvac) => (
            <Controller
              key={hvac.externalId}
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => {
                return (
                  <SelectableHvacsCard
                    hvacId={hvac.externalId}
                    manufacturer={hvac.manufacturer}
                    hvacName={hvac.hvacName || hvac.model || ''}
                    hvacType={hvac.hvacType}
                    selected={value.includes(hvac.externalId) || hvac.linked}
                    disabled={hvac.linked || isLinking}
                    onClick={(hvacId) => {
                      const isSelected = value.includes(hvacId);

                      if (isSelected) {
                        const updatedHvacs = value.filter(
                          (id) => id !== hvacId
                        );
                        onChange(updatedHvacs);
                      } else {
                        onChange([...value, hvacId]);
                      }
                    }}
                  />
                );
              }}
              name={'externalHvacs'}
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
            {t('connectHvacs')}
          </LoadingButton>
        </FooterWrapper>
      </form>
    </FormProvider>
  );
};
