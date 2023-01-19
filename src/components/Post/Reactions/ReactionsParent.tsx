/** @jsxImportSource @emotion/react */
import React from 'react'
import { CommentModal, Reaction } from '../..'
import { IComments, TReact } from '../../../features/post/postSlice';

import Like from '@iconscout/react-unicons/icons/uil-thumbs-up'
import Love from '@iconscout/react-unicons/icons/uil-heart'
import Haha from '@iconscout/react-unicons/icons/uil-grin-tongue-wink'
import Replay from '@iconscout/react-unicons/icons/uil-comment-message'
import tw from 'twin.macro';
import { selectCommentModalId, selectOpenCommentModal, setCommentModal } from '../../../features/main/mainSlice';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';

interface IProps {
  like: number;
  love: number;
  haha: number;
  postId: number;
  comments: IComments[];
  activeReact: TReact | null;
  handleReact: (e) => void;
}

const ReactionsParent: React.FC<IProps> = ({ like, love, haha, postId, comments, activeReact, handleReact }) => {
  const dispatch = useAppDispatch();
  const commentModalId = useAppSelector(selectCommentModalId);
  const openCommentModal = useAppSelector(selectOpenCommentModal);

  const handleReplay = () => {
    dispatch(setCommentModal(postId));
  }

  return (
    <div className="TweetReactions" >
      <Reaction
        reactions={like}
        react={'like'}
        Icon={Like}
        active={activeReact}
        handleReact={handleReact}
      />
      <Reaction
        reactions={love}
        react={'love'}
        Icon={Love}
        active={activeReact}
        handleReact={handleReact}
      />
      <Reaction
        reactions={haha}
        react={'haha'}
        Icon={Haha}
        active={activeReact}
        handleReact={handleReact}
      />
      <div data-react="replay" css={tw`hover:text-replay`} className="ReactionParent group replay" onClick={handleReplay} >
        <span css={tw`group-hover:bg-replay/10`}>
          <Replay />
        </span>
        <span>{comments.length}</span>
      </div>
      {
        openCommentModal && commentModalId === postId &&
        <CommentModal postId={postId} comments={comments}/>
      }
    </div>
  )
}

export default ReactionsParent