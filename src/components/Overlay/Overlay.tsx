import React from 'react'
import tw from 'twin.macro'
import { useAppDispatch, useAppSelector } from '../../app/hooks/hooks'
import { selectOverlay, setOverlay } from '../../features/main/mainSlice'

export const TwOverlay = tw.div`fixed left-0 top-0 bg-black/40 w-full h-screen z-40`;

const Overlay: React.FC = () => {
  const show = useAppSelector(selectOverlay);
  const dispatch = useAppDispatch();
  
  const closeHandler = () => {
    dispatch(setOverlay(false));
  }
  return (
    <>
      {show && 
      <TwOverlay onClick={closeHandler}/>}
    </>
  )
}

export default Overlay