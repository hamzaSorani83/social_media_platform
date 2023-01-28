import { QueryClient, useMutation, useQuery, useQueryClient } from "react-query";
import { IPost } from "../../features/post/postSlice";
import { request } from "../../features/utils/axios";
import { updatePosts } from "./usePostsData";

const getPost = (postId: number) => {
  return request({url: `posts/${postId}`})
}

export const useGetPost = (postId: number) => {
  return useQuery(['get-post', postId], () => getPost(postId));
}

const editPost = (data: IPost) => {
  return request({ url: `posts/${data.id}`, method: 'put', data });
}

const updateMyPosts = (queryClient: QueryClient, data) => {
  queryClient.invalidateQueries(['my-posts', data.data.authorId])
}

export const useEditPost = () => {
  const queryClient = useQueryClient();
  return useMutation(editPost, {
    onSuccess: (data) => {
      updateMyPosts(queryClient, data.data);
      updatePosts(queryClient, data.data);
    },
  });
};