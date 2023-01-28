import { useMutation, useQueryClient } from "react-query";
import { IFav } from "../../features/post/postSlice";
import { request } from "../../features/utils/axios";


const removeFromFav = (data: IFav) => {
  return request({ url: `favorites/?postId=${data.postId}&userId=${data.userId}`}).then(
    (res) => {
      return request({ url: `favorites/${res.data[0].id}`, method: 'delete'})
    }
  );
};

export const useRemoveFromFav = () => {
  const queryClient = useQueryClient();
  return useMutation(removeFromFav, {
    onSuccess: (_data) => {
      queryClient.invalidateQueries(['my-fav']);
    }
  });
};

const addToFav = (data: IFav) => {
  return request({ url: `favorites/?postId=${data.postId}&userId=${data.userId}`}).then(
    (res) => {
      if (res.data.length) return {
        data: res.data[0]
      };
      else return request({ url: `favorites`, method: "post", data })
    }
  );
};

export const useAddToFav = () => {
  const queryClient = useQueryClient();
  return useMutation(addToFav, {
    onSuccess: data => {
      queryClient.invalidateQueries(['my-fav', data.data.userId]);
    }
  });
};
