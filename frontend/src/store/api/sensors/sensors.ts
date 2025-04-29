import { Sensors } from 'types/entities/sensors';

import baseApi from 'store/services/base';

export const sensorsApi = baseApi
  .enhanceEndpoints({ addTagTypes: ['fetchSensors'] })
  .injectEndpoints({
    endpoints: (builder) => ({
      fetchSensors: builder.query<
        Sensors.Methods.FetchSensorsData.Response,
        Sensors.Methods.FetchSensorsData.Request
      >({
        query: () => `sensors`,
        providesTags: ['fetchSensors'],
      }),
    }),
  });

export const { useFetchSensorsQuery, useLazyFetchSensorsQuery } = sensorsApi;
