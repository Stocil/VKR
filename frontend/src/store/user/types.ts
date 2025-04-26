import { Nullable } from 'types';

export type UserInfo = {
  id: Nullable<number>;
  login: string;
  email: string;
  gmail: Nullable<string>;
  avatar: Nullable<string>;
};

export type UserInfoWithToken = UserInfo & {
  token: string;
};

export type InitialState = {
  info: UserInfo;
  token: Nullable<string>;
  isLoggin: boolean;
};
