import { User } from 'types/entities/user';

import baseApi from 'store/services/base';

export const userApi = baseApi.enhanceEndpoints({}).injectEndpoints({
  endpoints: (builder) => ({
    editUser: builder.mutation<
      User.Methods.EditUser.Response,
      User.Methods.EditUser.Request
    >({
      query: (body) => ({
        url: `user/${body.id}`,
        method: 'PATCH',
        body,
      }),
    }),
  }),
});

export const { useEditUserMutation } = userApi;
