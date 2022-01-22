import React from 'react'
import Main from '../components/main/Main'
import Home from '../components/home/Home'
import Login from '../components/main/login/Login'
import Signup from '../components/main/signup/Signup'
import User from '../components/home/user/User'
import Posts from '../components/home/posts/Posts'
import Reply from '../components/home/posts/Reply'
import SinglePostPage from '../components/home/posts/SinglePostPage'
import {
  BrowserRouter,
  Route,
  Routes,
  Navigate
} from 'react-router-dom'
import ProtectedRoute from './ProtectedRoute'

const Routers = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />}>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Route>
        <Route path="/home" element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
        >
          <Route index element={<Posts />} />
          <Route path="user/:username" element={<User />} />
          <Route path="post/:postId" element={<SinglePostPage />} />
          <Route path="post/:postId/reply" element={<Reply />} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Routers