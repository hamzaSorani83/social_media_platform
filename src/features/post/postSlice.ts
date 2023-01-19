import { createSlice } from '@reduxjs/toolkit';

export interface IComments {
  userName: string;
  userId: string;
  comment: string;
}

export interface IReact {
  userId: string;
  postId: string;
  react: TReact;
}

export interface IPost {
  id: string;
  title: string;
  content: string;
  img: string;
  author: string;
  authorId: string;
  reacts: IReact[];
  comments: IComments[];
}

export type TReact = 'like' | 'love' | 'haha'; 

export interface Reacts {
  user: string;
  userId: string;
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