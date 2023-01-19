import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import { Home, Login } from './pages'
import { Overlay, Loading, CommentModal } from './components';
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
      <CommentModal />
      <Routes>
        {
          loggedIn && AuthRoutes
        }
        <Route path='/login' element={<Login/>} />
        <Route path='/signup' element={<Login loginMode={false} />} />
        <Route path='*' element={<Login loginMode={false} />} />
      </Routes>
    </div>
  );
}

export default App;
