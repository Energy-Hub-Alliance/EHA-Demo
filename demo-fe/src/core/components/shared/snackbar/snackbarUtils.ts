import { OptionsObject } from 'notistack';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let notistackRef: React.RefObject<any> | null = null;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const setSnackbarRef = (ref: React.RefObject<any>) => {
  notistackRef = ref;
};

export const showSnackbar = (
  alertType: OptionsObject['variant'],
  message: string
) => {
  notistackRef?.current?.enqueueSnackbar(message, {
    variant: alertType,
  });
};
