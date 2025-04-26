import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import rootReducer from './root-reducer';
import baseApi from './services/base';

// Конфигурируем хранилище
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});

// Генерируем типы хранилища и диспатчера
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Генерируем правильным образом типизированные хуки
const useAppDispatch: () => AppDispatch = useDispatch;
const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default {
  useDispatch: useAppDispatch,
  useSelector: useAppSelector,
};
