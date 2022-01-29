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
        }>
          <Route index element={
            <ProtectedRoute>
              <Posts />
            </ProtectedRoute>
          } />
          <Route path="user/:username" element={
            <ProtectedRoute>
              <User />
            </ProtectedRoute>
          } />
          <Route path="post/:postId" element={
            <ProtectedRoute>
              <SinglePostPage />
            </ProtectedRoute>
          } />
          <Route path="search" element={
            <ProtectedRoute>
              <Search />
            </ProtectedRoute>
          } />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Routers