import { Users } from 'types/entities/users';

import baseApi from 'store/services/base';

export const usersApi = baseApi.enhanceEndpoints({}).injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query<
      Users.Methods.GetUser.Response,
      Users.Methods.GetUser.Request
    >({
      query: ({ id }) => `user/${id}`,
    }),
  }),
});

export const { useGetUserQuery } = usersApi;
