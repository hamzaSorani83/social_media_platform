import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

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
  posts: IPost[],
}


const initialState: IState = {
  posts: [],
}

export const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {

  }
} )

// export const { addPost, toggleReact, setPosts } = postSlice.actions;

export const selectPosts = (state: RootState) => state.post.posts;

export default postSlice.reducer;