import { Action,combineReducers,configureStore, ThunkAction } from "@reduxjs/toolkit";
import sliceTitle from './title';
import sliceGraph from './graph';

const reducer = combineReducers({sliceTitle,sliceGraph});
const store = configureStore({
  reducer: reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void,RootState,null,Action<string>>;

export default store;