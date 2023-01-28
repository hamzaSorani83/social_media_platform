import { QueryClient, useMutation, useQuery, useQueryClient } from "react-query";
import { IPostData } from "../../components/Post/CreatePost";
import { request } from "../../features/utils/axios";

const fetchAllPostsData = () => {
  return request({
    url: `posts?_sort=id&_order=desc`,
  });
};

export const useAllPostsData = () => {
  return useQuery(["all-posts"], fetchAllPostsData);
};

const createPostData = (post: IPostData) => {
  return request({ url: `posts`, method: "post", data: post });
};

export const updatePosts = (queryClient: QueryClient, data) => {
  queryClient.setQueryData(["all-posts"], (oldPosts: any) => {
    if (!oldPosts) return { data: [data.data] };
    return {
      ...oldPosts,
      data: [data.data, ...oldPosts.data],
    };
  });
}

export const useCreatePostData = () => {
  const queryClient = useQueryClient();
  return useMutation(createPostData, {
    onSuccess: (data) => {
      updatePosts(queryClient, data);
    },
  });
};
