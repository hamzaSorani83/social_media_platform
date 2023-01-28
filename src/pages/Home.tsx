import tw from 'twin.macro';
import { useAllPostsData } from '../app/hooks/usePostsData';
import { CreatePost, Loading, Post } from '../components';

export const TwMiddle = tw.div`mt-12 w-full xl:w-7/12 min-h-full border flex flex-col border-gray-200  dark:border-dim-200`;

const Home = () => {
  const { isLoading, data: posts } = useAllPostsData();
  if (isLoading) <Loading isLoading={isLoading} />
  
  return (
    <TwMiddle>
      <CreatePost />
      {
        posts?.data.length && posts.data.map((el, index) => (
          <Post
            post={el}
            key={index}
          />
        ))
      }
    </TwMiddle>
  )
}

export default Home