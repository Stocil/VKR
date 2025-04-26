import { Nullable } from 'types';

export type ProfileFormFields = {
  login: string;
  email: string;
  avatar: Nullable<string>;
};
