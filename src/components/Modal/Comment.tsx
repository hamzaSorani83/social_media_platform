/** @jsxImportSource @emotion/react */
import React from 'react'
import { Link } from 'react-router-dom'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import tw from 'twin.macro'
import { IComments } from '../../features/post/postSlice'
import UserPhoto from '../User/UserPhoto'



const Comment: React.FC<IComments> = ({userId, userName, comment}) => {
  return (
    <div tw="flex my-3 bg-white dark:bg-gray-800">
      <div tw="w-full bg-white dark:bg-gray-800 text-black dark:text-gray-200 p-4 antialiased flex max-w-lg">
        <UserPhoto id={userId} />
        <div tw='w-full'>
          <div tw="bg-gray-100 dark:bg-gray-700 rounded-3xl px-4 pt-2 pb-2.5">
            <Link to={`/profile/${userId}`} tw="font-semibold text-sm leading-relaxed hover:text-purple-600 transition-colors">{userName}</Link>
            <div tw="leading-snug md:leading-normal w-full"> {comment} </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Comment