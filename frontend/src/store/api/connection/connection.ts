import { Connection } from 'types/entities/connection';

import baseApi from 'store/services/base';

export const connectionApi = baseApi.enhanceEndpoints({}).injectEndpoints({
  endpoints: (builder) => ({
    checkServerConnection: builder.query<
      Connection.Methods.CheckConnectionStatus.Response,
      Connection.Methods.CheckConnectionStatus.Request
    >({
      query: () => `ping`,
    }),
  }),
});

export const { useLazyCheckServerConnectionQuery } = connectionApi;
