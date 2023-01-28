/** @jsxImportSource @emotion/react */
import { useAppSelector } from '../app/hooks/hooks'
import { selectUserId } from '../features/user/userSlice'
import { Loading, Post } from '../components';
import { TwMiddle } from './Home';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import tw from 'twin.macro';
import { useMyPostsDaa } from '../app/hooks/useMyPostsData';

const MyPosts = () => {
  const userId = useAppSelector(selectUserId);
  const { isLoading, data: myPosts } = useMyPostsDaa(userId);
  
  if (isLoading) return <Loading isLoading={isLoading} />
  
  return (
    <TwMiddle>
      {
        myPosts.data.length ? myPosts.data.map((el, index) => (
          <Post post={el} key={index} editMode={true} />
        )) : <h1 tw='text-purple-600 text-2xl mx-auto mt-9 capitalize'>no posts!</h1>
      }
    </TwMiddle>
  )
}

export default MyPosts