/** @jsxImportSource @emotion/react */
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import axios from '../axiosInstance/axios'
import tw from 'twin.macro'

import { useAppSelector } from '../../app/hooks'
import { selectUserId } from '../../features/user/userSlice'
import { IPost, IReact, TReact } from '../../features/post/postSlice'
import { UserPhoto, ReactionsParent } from '../'

interface IProps {
  post: IPost
}

const Post: React.FC<IProps> = ({ post }) => {
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
          changeReact(res.data[0].id, {react, userId, postId: post.id });
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

  return (
    <div className='Tweet'>
      <div className="TweetUserDetails">
        <UserPhoto id={post.authorId} />
        <p className='TweetUserName'>
          <Link to={`/profile/${post.authorId}`}> {post.author} </Link>
          <Link to={`/profile/${post.authorId}`} className='TweetUserId'> <span>@{post.author}</span> </Link>
        </p>
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
