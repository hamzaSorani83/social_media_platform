/** @jsxImportSource @emotion/react */
import React, { useState } from 'react'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import tw from 'twin.macro';
import Close from '@iconscout/react-unicons/icons/uil-multiply'

import './CommentModal.css'
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { closeCommentModal, selectOpenCommentModal } from '../../features/main/mainSlice';
import { IComments } from '../../features/post/postSlice';
import { AddComment, Comment } from '..';


interface IProps {
  postId: string;
  comments: IComments[];
}

const CommentModal: React.FC<IProps> = ({ postId, comments }) => {
  const isOpen = useAppSelector(selectOpenCommentModal);
  const dispatch = useAppDispatch();
  const [newestComment, setNewestComment] = useState<IComments>()

  return (
    <div>
      <div className={['Modal', isOpen ? 'active' : ''].join(' ')}>
        <section tw="p-3 border-b border-gray-200">
          <div tw='flex justify-between'>
            <button
              onClick={() => dispatch(closeCommentModal())}
              tw='h-6 w-6 text-blue-500 hover:text-blue-400 cursor-pointer'>
              <Close />
            </button>
            <span tw="font-semibold">{comments.length} comments</span>
          </div>
          <section>
            <div>
              <div tw='bg-white border border-[#dddfe2] rounded text-gray-600 p-8'>
                <div className="body_comment">
                  <AddComment postId={postId} setNewestComment={setNewestComment} />
                  {
                    newestComment && 
                    <Comment
                      userName={newestComment.userName}
                      userId={newestComment.userId}
                      comment={newestComment.comment} />
                  }
                  {
                    comments.map((el, index) => {
                      return (
                        <Comment
                          userId={el.userId}
                          userName={el.userName}
                          comment={el.comment}/>
                      )
                    })
                  }
                </div>
              </div>
            </div>
          </section>
        </section>
      </div>
    </div>
  )
}

export default CommentModal