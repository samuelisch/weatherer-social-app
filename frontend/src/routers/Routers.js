import React from 'react'
import Main from '../components/main/Main'
import Home from '../components/home/Home'
import User from '../components/home/user/User'
import Posts from '../components/home/posts/Posts'
import SinglePostPage from '../components/home/posts/SinglePostPage'
import Search from '../components/home/search/Search'
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
        <Route path="/" element={<Main />} />
        <Route path="/home" element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
        >
          <Route index element={<Posts />} />
          <Route path="user/:username" element={<User />} />
          <Route path="post/:postId" element={<SinglePostPage />} />
          <Route path="search" element={<Search />} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Routers