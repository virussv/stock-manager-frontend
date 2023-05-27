import { Action,configureStore, ThunkAction } from "@reduxjs/toolkit";
import slice from './title';

const store = configureStore({
  reducer: slice,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void,RootState,null,Action<string>>;

export default store;