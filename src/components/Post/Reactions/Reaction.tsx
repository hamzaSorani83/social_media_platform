/** @jsxImportSource @emotion/react */
import React from 'react'
import tw from 'twin.macro'
import { TReact } from '../../../features/post/postSlice';

interface IProps {
  reactions: number;
  react: TReact;
  Icon: any;
  active: TReact | null;
  handleReact: (e) => void;
}

const styles = {
  parent: {
    like: tw`hover:text-like`,
    love: tw`hover:text-love`,
    haha: tw`hover:text-haha`,
  },
  child: {
    like: tw`group-hover:bg-like/10`,
    love: tw`group-hover:bg-love/10`,
    haha: tw`group-hover:bg-haha/10`,
  }
}

const Reaction: React.FC<IProps> = ({ reactions, react, Icon, active, handleReact }) => {
  return (
    <div data-react={react} css={[styles.parent[react]]} className={`ReactionParent group ${react} ${active === react ? 'active' : null}`} onClick={handleReact} >
    <span css={styles.child[react]}>
      <Icon />
    </span>
    <span>{reactions}</span>
  </div>
  )
}

export default Reaction