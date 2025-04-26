import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryArgs,
  FetchBaseQueryError,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query';

import { HttpCodes } from 'utils/http-codes';
import {
  deleteCookieToken,
  getTokenFromCookie,
  setCookieToken,
} from 'utils/token';

import { baseUrl } from '../api/constants';

export const refreshToken = async () =>
  fetch(`${baseUrl}/refresh`, {
    credentials: 'include',
  });

export const baseQueryConfig: FetchBaseQueryArgs = {
  baseUrl: baseUrl,
  prepareHeaders: (headers) => {
    const token = getTokenFromCookie();

    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }

    return headers;
  },
  credentials: 'include',
};

const baseQuery = fetchBaseQuery(baseQueryConfig);

type Args = string | FetchArgs;

const baseQueryWithReauth: BaseQueryFn<
  Args,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let preparedArgs: Args;

  // условие срабатывает, когда из колбэка в параметре query возвращаем строку вместо объекта ex: query: () => 'login'
  if (typeof args === 'string') {
    preparedArgs = `${args}`;
  } else {
    preparedArgs = args;
  }

  let result = await baseQuery(preparedArgs, api, extraOptions);

  if (result.error && result.error.status === HttpCodes.UNAUTHORIZED) {
    const token = await refreshToken();
    const response = await token.json();

    if (typeof response === 'string') {
      setCookieToken(response);
      result = await baseQuery(preparedArgs, api, extraOptions);
    } else {
      deleteCookieToken();
    }
  }

  return result;
};

export default baseQueryWithReauth;
