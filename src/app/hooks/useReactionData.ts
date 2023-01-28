import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "react-query";
import { IReactApi, IReactsApi } from "../../components/Post/Post";
import { IReact } from "../../features/post/postSlice";
import { request } from "../../features/utils/axios";

const getPostReacts = (postId: number) => {
  return request({ url: `reacts/?postId=${postId}` });
};

export const useGetPostReacts = (
  postId: number,
  onSuccess: (reacts: IReactsApi) => void
) => {
  return useQuery(["post-reacts", postId], () => getPostReacts(postId), {
    onSuccess,
  });
  
};

const addReact = (react: IReact) => {
  return request({ url: "reacts", method: "post", data: react });
};

const setAddedReact = (queryClient: QueryClient, data: IReactApi) => {
  queryClient.setQueryData(
    ["post-reacts", data.data.postId],
    (oldReacts: any) => {
      if (!oldReacts) {
        return {
          data: [data.data],
        };
      }
      return {
        ...oldReacts,
        data: [data.data, ...oldReacts.data],
      };
    }
  );
};

const setNewActiveReact = (queryClient: QueryClient, data: IReactApi) => {
  queryClient.setQueryData(
    ["active-reacted", data.data.postId, data.data.userId],
    (oldActiveReact) => {
      return {
        data: [data.data],
      };
    }
  );
};

export const useAddReact = () => {
  const queryClient = useQueryClient();
  return useMutation(addReact, {
    onSuccess: (data: IReactApi) => {
      setAddedReact(queryClient, data);
      setNewActiveReact(queryClient, data);
    },
  });
};

let deletedReact: IReact;
const removeReact = (reactId: number) => {
  request({ url: `reacts/${reactId}` }).then(
    (res) => (deletedReact = res.data)
  );
  return request({ url: `reacts/${reactId}`, method: "delete" });
};

const setRemovedReact = (queryClient: QueryClient) => {
  queryClient.setQueryData(
    ["post-reacts", deletedReact.postId],
    (oldReacts: any) => {
      const filteredData = oldReacts.data.filter((react: IReact) => react.id !== deletedReact.id);
      return {
        data: filteredData
      }
    }
  );
};

const setRemovedActiveReact = (queryClient: QueryClient) => {
  queryClient.setQueryData(
    ["active-reacted", deletedReact.postId, deletedReact.userId],
    (oldActiveReact) => {
      return {
        data: [],
      };
    }
  );
};

export const useRemoveReact = () => {
  const queryClient = useQueryClient();
  return useMutation(removeReact, {
    onSuccess: (data) => {
      setRemovedReact(queryClient);
      setRemovedActiveReact(queryClient);
    },
  });
};

interface IChangeReact {
  id: number;
  react: IReact;
}

const changeReact = (data: IChangeReact) => {
  return request({ url: `reacts/${data.id}`, method: 'patch', data: data.react });
}

export const useChangeReact = () => {
  const queryClient = useQueryClient();
  return useMutation(changeReact, {
    onSuccess: (data) => {
      queryClient.invalidateQueries('post-reacts');
      queryClient.invalidateQueries(["active-reacted", data.data.postId, data.data.userId])
    },
  });
}

const getActiveReact = (postId: number, userId: number) => {
  return request({ url: `reacts/?postId=${postId}&userId=${userId}` });
};

export const useActiveReact = (postId: number, userId: number) => {
  return useQuery(["active-reacted", postId, userId], () =>
    getActiveReact(postId, userId)
  );
};
