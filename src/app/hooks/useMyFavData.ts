import { useQuery } from 'react-query'
import { request } from '../../features/utils/axios'


const fetchMyFavData = (userId: number) => {
  return request({url: `favorites/?userId=${userId}&_expand=post`})
}

export const useMyFavData = (userId: number) => {
  return useQuery(['my-fav', userId], () => fetchMyFavData(userId));
}
