/** @jsxImportSource @emotion/react */
import Profile from '@iconscout/react-unicons/icons/uil-user-circle'
import { Link } from 'react-router-dom'
import tw from 'twin.macro';

const UserPhoto = ({id}) => {
  return (
    <Link
      to={`/profile/${id}`}
      className='UserImg'
      css={tw`text-purple-500`}
    >
      <Profile size="50px"/>
    </Link>
  )
}

export default UserPhoto