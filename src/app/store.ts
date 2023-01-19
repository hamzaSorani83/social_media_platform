import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { userReducer, postReducer, mainReducer } from '../features';

export const store = configureStore({
  reducer: {
    main: mainReducer,
    user: userReducer,
    post: postReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
