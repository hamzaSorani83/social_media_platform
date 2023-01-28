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
  id?: number | null
}

export interface IFav {
  userId: number;
  postId: number;
  id?: number;
}

export interface IPost {
  id: number;
  title: string;
  content: string;
  img: string;
  author: string | undefined;
  authorId: number;
  reacts: IReact[];
  comments: IComments[];
}

export type TReact = 'like' | 'love' | 'haha'; 


export interface IReactions {
  like: number;
  love: number;
  haha: number;
}

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