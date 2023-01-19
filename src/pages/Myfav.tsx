import React, { useEffect, useState } from 'react'
import { useAppSelector } from '../app/hooks';
import { Post } from '../components';
import axios from '../components/axiosInstance/axios';
import { IPost } from '../features/post/postSlice';
import { selectUserId } from '../features/user/userSlice';
import { TwMiddle } from './Home'

const MyFav = () => {
  const userId = useAppSelector(selectUserId);
  const [myFav, setMyFav] = useState<IPost[]>([]);

  useEffect(() => {
    axios.get(`favorites/?userId=${userId}&_expand=post`)
      .then(res => {
        console.log(res.data)
        let arr:IPost[] = [];
        res.data.forEach(element => {
          arr.push({...element.post, reacts: [], comments: []});
        });
        setMyFav(arr);
      })
  }, [userId])
  return (
    <TwMiddle>
      {
        myFav &&
        myFav.map((el, index) => (
          <Post key={index} post={el} inFav={true} />
        ))
      }
    </TwMiddle>
  )
}

export default MyFav