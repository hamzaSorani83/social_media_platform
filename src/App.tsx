import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import { Home, Login, MyPosts, MyFav } from './pages'
import { Overlay, Loading } from './components';
import { useAppSelector } from './app/hooks';
import { selectLoggedIn } from './features/user/userSlice';

function App() {
  const loggedIn = useAppSelector(selectLoggedIn);
  let AuthRoutes = (
    <>
      <Route path='/' element={<Home/>}/>
    </>
  )
  return (
    <div className="App">
      {
      }
      <Loading />
      <Overlay />
      <Routes>
        {
          loggedIn && AuthRoutes
        }
        <Route path='/login' element={<Login/>} />
        <Route path='/signup' element={<Login loginMode={true} />} />
        <Route path='/my-posts' element={<MyPosts/>} />
        <Route path='/my-fav' element={<MyFav/>} />
        <Route path='*' element={<Login loginMode={false} />} />
      </Routes>
    </div>
  );
}

export default App;
