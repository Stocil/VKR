import { RootState } from 'store';

export const getAuthorizationPasswordModalState = (state: RootState) =>
  state.authorization.modals.password;
