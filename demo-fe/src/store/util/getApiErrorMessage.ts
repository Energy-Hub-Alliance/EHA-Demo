import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { apiErrorMessages } from './apiErrorMessages';

export function getApiErrorMessage(
  error: FetchBaseQueryError | SerializedError
) {
  // type: FetchBaseQueryError
  if ('status' in error) {
    const errorData = error?.data as { errorCode?: string } | undefined;

    if (error.status === 429) {
      return apiErrorMessages['VENDOR_RATE_LIMIT'];
    }
    return errorData?.errorCode && errorData?.errorCode in apiErrorMessages
      ? errorData?.errorCode
      : apiErrorMessages['GENERIC'];
  }
  // type: SerializedError
  else
    return error.code && error.code in apiErrorMessages
      ? error.code
      : apiErrorMessages['GENERIC'];
}
