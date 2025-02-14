import * as yup from 'yup';

export const selectChargingHardwareFormValidationSchema = yup.object().shape({
  vendor: yup.string().required(),
  externalChargers: yup.array().of(yup.string().required()).required(),
});
