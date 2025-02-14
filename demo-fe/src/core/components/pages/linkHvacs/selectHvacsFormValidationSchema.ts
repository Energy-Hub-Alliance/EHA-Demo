import * as yup from 'yup';

export const selectHvacsFormValidationSchema = yup.object().shape({
  vendor: yup.string().required(),
  externalHvacs: yup.array().of(yup.string().required()).required(),
});
