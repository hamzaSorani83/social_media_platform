/** @jsxImportSource @emotion/react */
import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

import tw from 'twin.macro'
import Favorite from '@iconscout/react-unicons/icons/uil-favorite'
import True from '@iconscout/react-unicons/icons/uil-check'
import Delete from '@iconscout/react-unicons/icons/uil-trash-alt'
import Edit from '@iconscout/react-unicons/icons/uil-pen'

import { useAppSelector } from '../../app/hooks/hooks'
import { selectUserId } from '../../features/user/userSlice'
import { IPost, IReact, TReact } from '../../features/post/postSlice'
import { UserPhoto, ReactionsParent } from '../'
import { useActiveReact, useAddReact, useChangeReact, useGetPostReacts, useRemoveReact } from '../../app/hooks/useReactionData'
import { useAddToFav, useRemoveFromFav } from '../../app/hooks/useFavData'
import { useDeletePost } from '../../app/hooks/useDeletePost'

interface IProps {
  post: IPost;
  inFav?: boolean;
  editMode?: boolean;
}

export interface IReactsApi {
  data: IReact[];
}

export interface IReactApi {
  data: IReact;
}


const Post: React.FC<IProps> = ({ post, inFav, editMode }) => {
  const navigate = useNavigate();
  const userId = useAppSelector(selectUserId);
  const location = useLocation();
  const [addedToFav, setAddedToFav] = useState(inFav || location.pathname === '/favorites');
  const [like, setLike] = useState(0);
  const [love, setLove] = useState(0);
  const [haha, setHaha] = useState(0);
  
  const onSuccessGetPostReacts = (reacts: IReactsApi) => {
    setLike(reacts?.data.filter((el) => el.react === 'like').length)
    setLove(reacts?.data.filter((el) => el.react === 'love').length)
    setHaha(reacts?.data.filter((el) => el.react === 'haha').length)
  }
  
  // eslint-disable-next-line no-empty-pattern
  const {} = useGetPostReacts(post.id, onSuccessGetPostReacts);
  const { mutate: addReact } = useAddReact();
  const { mutate: removeReact } = useRemoveReact();
  const { mutate: changeReact } = useChangeReact();
  const { mutate: addToFav } = useAddToFav();
  const { mutate: removeFromFav } = useRemoveFromFav();
  const { mutate: deletePost } = useDeletePost();
  const { data: activeReact } = useActiveReact(post.id, userId);
  
  const handleReact = (e) => {
    const react: TReact = e.currentTarget.getAttribute('data-react');
    if (!activeReact.data.length) {
      addReact({react, userId, postId: post.id})
    } else if (activeReact.data[0].react === react) {
      removeReact(activeReact.data[0].id);
    } else {
      const data = { userId, react, postId: post.id };
      changeReact({id: activeReact.data[0].id, react: data})
    }
  }

  const handleAddToFav = () => {
    setAddedToFav(!addedToFav || location.pathname === '/favorites');
    addedToFav ? removeFromFav({postId: post.id, userId}) : addToFav({ userId, postId: post.id });
  }

  const handleEditPost = () => {
    navigate(`${post.id}`)
  }

  const handleDeletePost = () => {
    deletePost({userId, postId: post.id});
  }

  return (
    <div className='Tweet'>
      <div tw='flex justify-between'>
        <div tw='flex justify-between w-full'>
          <div className="TweetUserDetails">
            <UserPhoto id={post.authorId} />
            <p className='TweetUserName'>
              <Link to={`/profile/${post.authorId}`}> {post.author} </Link>
              <Link to={`/profile/${post.authorId}`} className='TweetUserId'> <span>@{post.author}</span> </Link>
            </p>
          </div>
          <div tw='flex justify-between'>
            {
              editMode &&
              <>
                <button
                  onClick={handleEditPost}
                  type='button'
                  tw='text-blue-500 mt-2 mr-3 cursor-pointer'>
                  <Edit />
                </button>
                <button
                  onClick={handleDeletePost}
                  type='button'
                  tw='text-red-500 mt-2 mr-3 cursor-pointer'>
                  <Delete />
                </button>
              </>
            }
            <button
              onClick={handleAddToFav}
              type='button'
              tw='text-yellow-500 mt-2 mr-3 cursor-pointer'>
              {addedToFav || location.pathname === '/favorites' ? <True /> : <Favorite />}
            </button>
          </div>
        </div>
      </div>
      <div className="TweetPostDetails">
        <h2 css={tw`text-gray-800 dark:text-gray-100 text-lg font-bold`}>{post.title}</h2>
        <p className='TweetPostText'>
          {post.content}
        </p>
        <ReactionsParent
          like={like}
          love={love}
          haha={haha}
          postId={post.id}
          activeReact={activeReact?.data[0]?.react}
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
