import * as yup from 'yup';

export const selectHomePowerFormValidationSchema = yup.object().shape({
  vendor: yup.string().required(),
  externalBatteries: yup.array().of(yup.string().required()).required(),
  externalPvInverters: yup.array().of(yup.string().required()).required(),
  externalMeters: yup.array().of(yup.string().required()).required(),
});
