import React from 'react'
import Home from '../components/home/Home'
import Main from '../components/main/Main'
import Login from '../components/home/login/Login'
import Signup from '../components/home/signup/Signup'
import User from '../components/main/user/User'
import Posts from '../components/main/posts/Posts'
import Reply from '../components/main/posts/Reply'
import SinglePostPage from '../components/main/posts/SinglePostPage'
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
        <Route path="/" element={<Home />}>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Route>
        <Route path="/main" element={
          <ProtectedRoute>
            <Main />
          </ProtectedRoute>
        }
        >
          <Route index element={<Posts />} />
          <Route path=":username" element={<User />} />
          <Route path=":username/:postId" element={<SinglePostPage />} />
          <Route path=":username/:postId/reply" element={<Reply />} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Routers