import React from 'react'
import tw from 'twin.macro'
import { Middle, Sidebar } from '../components';

export const TwPage = tw.div`container mx-auto h-full flex xl:max-w-xl`;

const Home = () => {
  
  return (
    <TwPage>
      <Sidebar />
      <Middle />
    </TwPage>
  )
}

export default Home