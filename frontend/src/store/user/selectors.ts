import { RootState } from 'store';

export const getUserInfo = (state: RootState) => state.user.info;

export const getUserIsLoggin = (state: RootState) => state.user.isLoggin;

export const getUserState = (state: RootState) => state.user;
