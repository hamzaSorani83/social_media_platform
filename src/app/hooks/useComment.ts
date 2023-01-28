import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "react-query";
import { ICommentDataForm } from "../../components/Modal/AddComment";
import { request } from "../../features/utils/axios";

const getComments = (postId: number) => {
  return request({ url: `comments/?postId=${postId}` });
};

export const useGetComments = (postId: number) => {
  return useQuery(["comments", postId], () => getComments(postId));
};

const addComment = (data: ICommentDataForm) => {
  return request({ url: `comments`, method: "post", data });
};

const updateComments = (queryClien: QueryClient, data: ICommentDataForm) => {
  queryClien.setQueryData(["comments", data.postId], (oldComments: any) => {
    console.log(oldComments);
    if (!oldComments) return {data: [data]}
    return {
      ...oldComments,
      data: [data, ...oldComments.data]
    }
  });
};

export const useAddComment = () => {
  const queryClient = useQueryClient();
  return useMutation(addComment, {
    onSuccess: (data) => {
      updateComments(queryClient, data.data);
    },
  });
};
