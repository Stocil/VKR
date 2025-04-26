import { jwtDecode } from 'jwt-decode';

import { UserInfo } from 'store/user/types';

export const COOKIE_TOKEN_NAME = 'token';

export const getTokenFromCookie = () =>
  document.cookie
    .split('; ')
    .find((cookie) => cookie.startsWith('token'))
    ?.split('=')[1];

export const getUserDataFromToken = (token: string): UserInfo => {
  const { id, login, email, gmail, avatar } = jwtDecode<UserInfo>(token);
  return { id, login, email, gmail, avatar };
};

export const setCookieToken = (token: string) => {
  document.cookie = `${COOKIE_TOKEN_NAME}=${token}; path=/`;
};

export const deleteCookieToken = () => {
  document.cookie = `${COOKIE_TOKEN_NAME}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
};
