import {
  BaseQueryFn,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';

export const createBaseQuery =
  (
    baseUrl: string
  ): BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> =>
  async (args, api, extraOptions) => {
    const result = await fetchBaseQuery({
      baseUrl,
    })(
      {
        url: typeof args === 'string' ? args : args.url,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('idToken')}`,
          ...(typeof args === 'object' && args.headers),
        },
        ...(typeof args === 'object' && args),
      },
      api,
      extraOptions
    );

    return result;
  };
