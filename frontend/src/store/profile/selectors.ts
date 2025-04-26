import { RootState } from 'store';

export const getProfilePreviewAvatar = (state: RootState) =>
  state.profile.previewAvatar;
