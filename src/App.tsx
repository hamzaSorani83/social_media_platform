import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import { Home, Login, MyPosts, MyFav } from './pages'
import { Overlay, Loading, Sidebar, EditPost } from './components';
import { useAppSelector } from './app/hooks';
import { selectLoggedIn } from './features/user/userSlice';
import tw from 'twin.macro';

export const TwPage = tw.div`container mx-auto h-full flex xl:max-w-xl`;

function App() {
  const loggedIn = useAppSelector(selectLoggedIn);
  let AuthRoutes = (
    <TwPage>
      <Sidebar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/favorites' element={<MyFav />} />
        <Route path='/my-posts' element={<MyPosts />} />
        <Route path='/my-posts/:id' element={<EditPost />} />
      </Routes>
    </TwPage>
  );
  let UnAuthRoutes = (
    <Routes>
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<Login loginMode={false} />} />
      <Route path='*' element={<Login loginMode={true} />} />
    </Routes>
  )
  return (
    <div className="App">
      {loggedIn ? AuthRoutes : UnAuthRoutes}
      <Loading />
      <Overlay />
    </div>
  );
}

export default App;
