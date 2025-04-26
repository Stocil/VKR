import { createApi } from '@reduxjs/toolkit/query/react';

import baseQuery from './base-query';

const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery,
  endpoints: () => ({}),
});

export default baseApi;
