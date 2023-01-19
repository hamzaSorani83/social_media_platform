import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { IPost } from '../post/postSlice';

import { fetchUser } from "../utils/fetchLocalStorage";

const userInfo = fetchUser();
const loggedin: boolean = userInfo != null ? true : false;

export interface IUser {
  userId: any;
  name: string;
  email: string;
  phone: string;
  favoriters?: IPost[];
}

export interface IUserState {
  user: IUser | null;
  loggedin: boolean;
}

const initialState: IUserState = {
  user: userInfo,
  loggedin,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUser | null>) => {
      localStorage.setItem('user', JSON.stringify(action.payload));
      return {
        ...state,
        loggedin: true,
        user: action.payload,
      }
    },
    logout: (state) => {
      localStorage.removeItem('user');
      return {
        ...state,
        loggedin: false,
        initialState
      }
    }
  }
} )

export const { setUser, logout } = userSlice.actions;

export const selectUser = (state: RootState) => state.user.user;
export const selectUserId = (state: RootState) => state.user.user ? state.user.user.userId : null;
export const selectUserName= (state: RootState) => state.user.user ? state.user.user.name : null;
export const selectLoggedIn= (state: RootState) => state.user.user ? state.user.loggedin : null;

export default userSlice.reducer;