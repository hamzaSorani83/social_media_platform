/* eslint-disable @typescript-eslint/no-unused-vars */
/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react'
import axios from '../components/axiosInstance/axios';
import { useAppSelector } from '../app/hooks'
import { selectUserId } from '../features/user/userSlice'
import { IPost } from '../features/post/postSlice';
import { Post } from '../components';
import { TwMiddle } from './Home';
import tw from 'twin.macro';

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
        myposts.length ? myposts.map((el, index) => (
          <Post post={el} key={index} editMode={true} />
        )) : <h1 tw='text-purple-600 text-2xl mx-auto mt-9 capitalize'>no posts!</h1>
      }
    </TwMiddle>
  )
}

export default MyPosts