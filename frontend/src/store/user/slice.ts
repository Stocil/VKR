import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { InitialState, UserInfo, UserInfoWithToken } from './types';

const initialState: InitialState = {
  info: {
    id: null,
    avatar: '',
    email: '',
    gmail: null,
    login: '',
  },
  token: null,
  isLoggin: false,
};

export const userSlice = createSlice({
  initialState,
  name: 'user',
  reducers: {
    setUserLogin: (state, action: PayloadAction<UserInfoWithToken>) => {
      const { token, ...userInfo } = action.payload;

      state.info = userInfo;
      state.token = token;
      state.isLoggin = true;
    },

    setUserLogout: (state) => {
      state.info = initialState.info;
      state.token = null;
      state.isLoggin = false;
    },

    setUserInfo: (state, action: PayloadAction<Omit<UserInfo, 'gmail'>>) => {
      state.info = { ...state.info, ...action.payload };
    },

    setUserToken: (state, action: PayloadAction<InitialState['token']>) => {
      state.token = action.payload;
    },

    setUserAvatar: (
      state,
      action: PayloadAction<InitialState['info']['avatar']>,
    ) => {
      state.info.avatar = action.payload;
    },
  },
});

export const {
  setUserLogin,
  setUserLogout,
  setUserInfo,
  setUserToken,
  setUserAvatar,
} = userSlice.actions;

export const userReducer = userSlice.reducer;
