import { createSlice } from '@reduxjs/toolkit';

export interface IComments {
  userName: string;
  userId: number;
  comment: string;
}

export interface IReact {
  userId: number;
  postId: number;
  react: TReact;
}

export interface IFav {
  userId: number;
  postId: number;
}

export interface IPost {
  id: number;
  title: string;
  content: string;
  img: string;
  author: string;
  authorId: number;
  reacts: IReact[];
  comments: IComments[];
}

export type TReact = 'like' | 'love' | 'haha'; 

export interface Reacts {
  user: string;
  userId: number;
  react: TReact;
};

interface IState {
}


const initialState: IState = {
}

export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
  }
} )

export default postSlice.reducer;