import { useQuery } from "react-query";
import { request } from "../../features/utils/axios";

const fetchMyPostsData = (userId) => {
  return request({url: `posts?authorId=${userId}&_embed=comments&_embed=reacts&_sort=id&_order=desc`})
}

export const useMyPostsDaa = (userId) => {
  return useQuery(['my-posts', userId], () => fetchMyPostsData(userId));
}