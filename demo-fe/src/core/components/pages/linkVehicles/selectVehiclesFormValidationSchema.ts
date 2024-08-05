import * as yup from 'yup';

export const selectVehiclesFormValidationSchema = yup.object().shape({
  vendor: yup.string().required(),
  externalVehicles: yup.array().of(yup.string().required()).required(),
});
