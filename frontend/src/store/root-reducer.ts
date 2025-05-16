import { combineReducers } from '@reduxjs/toolkit';

import baseApi from './services/base';

const rootReducer = combineReducers({
  [baseApi.reducerPath]: baseApi.reducer,
});

export default rootReducer;
