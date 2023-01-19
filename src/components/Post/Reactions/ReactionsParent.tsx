/** @jsxImportSource @emotion/react */
import React, { useState } from 'react'
import { Reaction } from '../..'
import { TReact } from '../../../features/post/postSlice';

import Like from '@iconscout/react-unicons/icons/uil-thumbs-up'
import Love from '@iconscout/react-unicons/icons/uil-heart'
import Haha from '@iconscout/react-unicons/icons/uil-grin-tongue-wink'
import Replay from '@iconscout/react-unicons/icons/uil-comment-message'
import tw from 'twin.macro';

interface IProps {
  like: number;
  love: number;
  haha: number;
  comments: number;
  activeReact: TReact | null;
  handleReact: (e) => void;
}

const ReactionsParent: React.FC<IProps> = ({ like, love, haha, comments, activeReact, handleReact }) => {
  const handleReplay = () => {
    
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
      <span>{comments}</span>
    </div>
  </div>
  )
}

export default ReactionsParent