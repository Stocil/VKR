import { combineReducers } from '@reduxjs/toolkit';

import { authorizationReducer } from './authorization';
import { profileReducer } from './profile/slice';
import baseApi from './services/base';
import { userReducer } from './user/slice';

const rootReducer = combineReducers({
  user: userReducer,
  profile: profileReducer,
  authorization: authorizationReducer,
  [baseApi.reducerPath]: baseApi.reducer,
});

export default rootReducer;
