import { Auth } from 'types/entities/auth';

import baseApi from 'store/services/base';

export const authApi = baseApi.enhanceEndpoints({}).injectEndpoints({
  endpoints: (builder) => ({
    registerUser: builder.mutation<
      Auth.Methods.RegisterUser.Response,
      Auth.Methods.RegisterUser.Request
    >({
      query: (body) => ({
        url: 'sign-up',
        method: 'PUT',
        body,
      }),
    }),

    loginUser: builder.mutation<
      Auth.Methods.LoginUser.Response,
      Auth.Methods.LoginUser.Request
    >({
      query: (body) => ({
        url: 'sign-in',
        method: 'POST',
        body,
      }),
    }),

    logoutUser: builder.mutation<void, void>({
      query: () => 'logout',
    }),

    checkUserAccess: builder.query<void, void>({
      query: () => 'access',
    }),

    checkUserGoogleLink: builder.mutation<
      Auth.Methods.CheckUserGoogleLink.Response,
      Auth.Methods.CheckUserGoogleLink.Request
    >({
      query: (body) => ({
        url: 'google/check-link',
        method: 'POST',
        body,
      }),
    }),

    registerUserByGoogle: builder.mutation<
      Auth.Methods.RegisterUserByGoogle.Response,
      Auth.Methods.RegisterUserByGoogle.Request
    >({
      query: (body) => ({
        url: 'google/sign-up',
        method: 'PUT',
        body,
      }),
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useLogoutUserMutation,
  useCheckUserAccessQuery,
  useCheckUserGoogleLinkMutation,
  useRegisterUserByGoogleMutation,
} = authApi;
