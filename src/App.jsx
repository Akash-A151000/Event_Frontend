import { useState } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import SignUp from './pages/signup';
import { useSelector } from 'react-redux';
import './App.css';
import SignIn from './pages/signin';
import Layout from './pages/layout';
import Home from './pages/home';
import Completed from './pages/completed';
import { Toaster } from 'react-hot-toast';

function App() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <div className='app'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Navigate to='/register' replace />} />
          <Route
            path='/register'
            element={isAuthenticated ? <Navigate to='/home' /> : <SignUp />}
          />
          <Route
            path='/login'
            element={isAuthenticated ? <Navigate to='/home' /> : <SignIn />}
          />
          <Route element={<Layout />}>
            <Route
              path='/home'
              element={
                isAuthenticated ? <Home /> : <Navigate to='/register' replace />
              }
            />
            <Route
              path='/completed'
              element={
                isAuthenticated ? (
                  <Completed />
                ) : (
                  <Navigate to='/register' replace />
                )
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
      <Toaster position='top-center' reverseOrder={false} />
    </div>
  );
}

export default App;
