import { useMutation, useQueryClient } from "react-query";
import { request } from "../../features/utils/axios"


interface IDeletePost {
  userId: number;
  postId: number;
}
const deletePost = (data: IDeletePost) => {
  return request({ url: `posts/${data.postId}`, method: 'delete' });
}

export const useDeletePost = () => {
  const queryClient = useQueryClient();
  return useMutation(deletePost, {
    onSuccess: data => {
      queryClient.invalidateQueries(['my-posts'])
    }
  });
}