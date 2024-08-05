import * as yup from 'yup';

export const selectTariffsFormValidationSchema = yup.object().shape({
  vendor: yup.string().required(),
  externalTariffs: yup.array().of(yup.string().required()).required(),
});
