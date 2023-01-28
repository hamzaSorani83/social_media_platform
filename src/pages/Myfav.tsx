/** @jsxImportSource @emotion/react */
import {  useAppSelector } from '../app/hooks/hooks';
import { Loading, Post } from '../components';
import { selectUserId } from '../features/user/userSlice';
import { TwMiddle } from './Home'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import tw from 'twin.macro';
import { useMyFavData } from '../app/hooks/useMyFavData';


const MyFav = () => {
  const userId = useAppSelector(selectUserId);
  const { isLoading, data: myFav } = useMyFavData(userId);
  if (isLoading) return <Loading isLoading={isLoading} />
  
  return (
    <TwMiddle>
      {
        myFav.data.length ? myFav.data.map((el, index) => (
          <Post key={index} post={el.post} inFav={true} />
        )) : <h1 tw='text-purple-600 text-2xl mx-auto mt-9 capitalize'>no favorite posts!</h1>
      }
    </TwMiddle>
  )
}

export default MyFav