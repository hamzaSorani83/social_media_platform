/** @jsxImportSource @emotion/react */
import React from 'react'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import tw from 'twin.macro';
import Close from '@iconscout/react-unicons/icons/uil-multiply'

import './CommentModal.css'
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectCommentModal, setCommentModal } from '../../features/main/mainSlice';

const Modal: React.FC = () => {
  const isOpen = useAppSelector(selectCommentModal);
  const dispatch = useAppDispatch();
  
  return (
    <div>
      <div className={['Modal', isOpen ? 'active' : ''].join(' ')}>
        <section tw="p-3 border-b border-gray-200">
          <button
            onClick={() => dispatch(setCommentModal(false))}
            tw='h-6 w-6 text-blue-500 hover:text-blue-400 cursor-pointer'>
            <Close />
          </button>
        </section>
      </div>
    </div>
  )
}

export default Modal