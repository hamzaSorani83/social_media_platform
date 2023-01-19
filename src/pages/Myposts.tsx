import React, { useEffect, useState } from 'react'
import axios from '../components/axiosInstance/axios';
import { useAppSelector } from '../app/hooks'
import { selectUserId } from '../features/user/userSlice'
import { IPost } from '../features/post/postSlice';
import { Post } from '../components';
import { TwMiddle } from './Home';

const MyPosts = () => {
  const userId = useAppSelector(selectUserId);
  const [myposts, setMyPosts] = useState<IPost[]>([]);

  useEffect(() => {
    axios.get(`posts?authorId=${userId}&_embed=comments&_embed=reacts&_sort=id&_order=desc`)
      .then(res => {
        setMyPosts(res.data)
      })
  }, [userId])

  return (
    <TwMiddle>
      {
        myposts && myposts.map((el, index) => (
          <Post post={el} key={index} />
        ))
      }
    </TwMiddle>
  )
}

export default MyPosts