import { useEffect, useState } from 'react'
import tw from 'twin.macro';
import { CreatePost, Post } from '..';
import axios from '../axiosInstance/axios';
import { useAppDispatch } from '../../app/hooks';
import { setLoading } from '../../features/main/mainSlice';

import { IPost } from '../../features/post/postSlice';

const TwMiddle = tw.div`mt-12 w-full xl:w-7/12 min-h-full border flex flex-col border-gray-200  dark:border-dim-200`;

const Middle = () => {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [newestPost, setNewestPost] = useState<IPost>()
  const dispatch = useAppDispatch();
  
  useEffect(() => {
    dispatch(setLoading(true));
    axios.get(`posts?_embed=comments&_embed=reacts&_sort=id&_order=desc`)
      .then(res => {
        setPosts(res.data);
      }).catch(err => {
      }).finally(() => {
        dispatch(setLoading(false));
      })
  }, [dispatch])
  return (
    <TwMiddle>
      <CreatePost setNewestPost={setNewestPost} />
      {
        newestPost &&
        <Post post={newestPost} />
      }
      {
        posts.map((el, index) => (
          <Post
            post={el}
            key={index}
          />
        ))
      }
    </TwMiddle>
  )
}

export default Middle