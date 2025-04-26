import { Nullable } from 'types';
import { Auth } from 'types/entities/auth';

type BaseModal = {
  isOpen: boolean;
};

type PasswordModal = BaseModal & {
  info: Nullable<Omit<Auth.GoogleEntity, 'password'>>;
};

export type InitialModalsState = {
  password: PasswordModal;
};
