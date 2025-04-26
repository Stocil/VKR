import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { InitialModalsState } from './types';

const initialState: InitialModalsState = {
  password: {
    isOpen: false,
    info: null,
  },
};

export const authorizationModalsSlice = createSlice({
  initialState,
  name: 'authorizationModals',
  reducers: {
    setAuthorizationModalsState: (
      state,
      action: PayloadAction<InitialModalsState['password'] | undefined>,
    ) => {
      state.password = action.payload ? action.payload : initialState.password;
    },
  },
});

export const { setAuthorizationModalsState } = authorizationModalsSlice.actions;

export const authorizationModalReducer = authorizationModalsSlice.reducer;
