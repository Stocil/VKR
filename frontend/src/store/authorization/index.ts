import { combineReducers } from '@reduxjs/toolkit';

import { authorizationModalReducer } from './modals/slice';

export const authorizationReducer = combineReducers({
  modals: authorizationModalReducer,
});
