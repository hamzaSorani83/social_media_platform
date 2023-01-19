/** @jsxImportSource @emotion/react */
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import axios from '../axiosInstance/axios'
import tw from 'twin.macro'
import Favorite from '@iconscout/react-unicons/icons/uil-favorite'
import True from '@iconscout/react-unicons/icons/uil-check'

import { useAppSelector } from '../../app/hooks'
import { selectUserId } from '../../features/user/userSlice'
import { IFav, IPost, IReact, TReact } from '../../features/post/postSlice'
import { UserPhoto, ReactionsParent } from '../'

interface IProps {
  post: IPost;
  inFav?: boolean
}

const Post: React.FC<IProps> = ({ post, inFav }) => {
  const userId = useAppSelector(selectUserId);

  let initialReactions = {
    like: 0,
    love: 0,
    haha: 0
  };

  let initialActiveReact;

  post.reacts.forEach(el => {
    initialReactions = {
      ...initialReactions,
      [el.react]: initialReactions[el.react] + 1,
    }
    if (userId === el.userId) {
      initialActiveReact = el.react;
    }
  });
  
  const [activeReact, setActiveReact] = useState<TReact | null>(initialActiveReact);
  const [reactions, setReactions] = useState(initialReactions);
  const [addedToFav, setAddedToFav] = useState(inFav);
  
  const handleReact = (e) => {
    const react: TReact = e.currentTarget.getAttribute('data-react');
    axios.get(`reacts/?postId=${post.id}&userId=${userId}`)
      .then(res => {
        let isNotReacted = !res.data.length;
        if (isNotReacted) {
          reactedWith({ react, userId, postId: post.id });
          setReactions({
            ...reactions,
            [react]: reactions[react] + 1,
          })
          setActiveReact(react);
        } else if (res.data[0].react === react) {
          removeReact(res.data[0].id);
          setReactions({
            ...reactions,
            [react]: reactions[react] - 1,
          })
          setActiveReact(null);
        } else {
          setReactions({
            ...reactions,
            [react]: reactions[react] + 1,
            [res.data[0].react]: reactions[res.data[0].react] - 1,
          });
          setActiveReact(react);
          changeReact(res.data[0].id, { react, userId, postId: post.id });
        }
      });
  }

  const reactedWith = (data: IReact) => {
    axios.post(`reacts`, data);
  }

  const removeReact = (id: string) => {
    axios.delete(`reacts/${id}`);
  }

  const changeReact = (id, data: IReact) => {
    axios.patch(`reacts/${id}`, data);
  }

  const handleAddToFav = () => {
    setAddedToFav(!addedToFav);
    addedToFav ? removeFromFav() : addToFav({userId, postId: post.id});
  }

  const removeFromFav = () => {
    axios.get(`favorites/?postId=${post.id}&userId=${userId}`).then(res => {
      axios.delete(`favorites/${res.data[0].id}`)
    })
  }

  const addToFav = (data: IFav) => {
    axios.get(`favorites/?userId=${userId}&postId=${post.id}`)
      .then(res => {
        if (res.data.length) return;
        axios.post(`favorites`, data)
      })
  }

  return (
    <div className='Tweet'>
      <div tw='flex justify-between'>
        <div className="TweetUserDetails">
          <UserPhoto id={post.authorId} />
          <p className='TweetUserName'>
            <Link to={`/profile/${post.authorId}`}> {post.author} </Link>
            <Link to={`/profile/${post.authorId}`} className='TweetUserId'> <span>@{post.author}</span> </Link>
          </p>
        </div>
        <button
          onClick={handleAddToFav}
          type='button'
          tw='text-yellow-500 mt-2 mr-3 cursor-pointer'>
          {addedToFav ? <True /> : <Favorite />}
        </button>
      </div>
      <div className="TweetPostDetails">
        <h2 css={tw`text-gray-800 dark:text-gray-100 text-lg font-bold`}>{post.title}</h2>
        <p className='TweetPostText'>
          {post.content}
        </p>
        <ReactionsParent
          like={reactions.like}
          love={reactions.love}
          haha={reactions.haha}
          postId={post.id}
          comments={post.comments}
          activeReact={activeReact}
          handleReact={handleReact}
        />
        {
          post.img &&
          <img src={post.img} alt="post img" />
        }
      </div>
    </div>
  )
}

export default Post
