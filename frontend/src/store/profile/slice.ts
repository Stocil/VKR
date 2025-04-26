import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { InitialState } from './type';

const initialState: InitialState = {
  previewAvatar: null,
};

export const profileSlice = createSlice({
  initialState,
  name: 'profile',
  reducers: {
    setProfilePreviewAvatar: (
      state,
      action: PayloadAction<string | undefined>,
    ) => {
      state.previewAvatar = action.payload
        ? action.payload
        : initialState.previewAvatar;
    },
  },
});

export const { setProfilePreviewAvatar } = profileSlice.actions;

export const profileReducer = profileSlice.reducer;
