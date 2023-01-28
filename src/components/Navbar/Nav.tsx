/** @jsxImportSource @emotion/react */
import tw from "twin.macro";

import HomeIcon from "@iconscout/react-unicons/icons/uil-house-user";
import ProfileIcon from "@iconscout/react-unicons/icons/uil-user";
import Logout from "@iconscout/react-unicons/icons/uil-sign-out-alt"
import favorite from '@iconscout/react-unicons/icons/uil-favorite'
import myPosts from '@iconscout/react-unicons/icons/uil-postcard'
import { Link } from '../'
import { TwText } from "../Link/Link";
import { useAppDispatch } from "../../app/hooks/hooks";
import { logout } from "../../features/user/userSlice";
import { useNavigate } from "react-router-dom";

const TwNav = tw.nav`pt-10 fixed top-0 h-screen xl:pr-4 flex flex-col items-center justify-start xl:items-start`;
const TwButton = tw.button`flex mb-8 justify-center items-center xl:justify-start capitalize transition-colors duration-200 hover:text-red-600`;

const Nav = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  
  const logoutHandler = () => {
    dispatch(logout());
    navigate('/');
  }
  return (
    <TwNav>
      <Link to='/' text={'home'} Icon={HomeIcon} />
      <Link to='/profile' text={'profile'} Icon={ProfileIcon} />
      <Link to={`/favorites`} text={'favorite'} Icon={favorite} />
      <Link to={`/my-posts`} text={'my posts'} Icon={myPosts} />
      <TwButton onClick={logoutHandler}>
        <Logout />
        <TwText>logout</TwText>
      </TwButton>
    </TwNav>
  )
}

export default Nav