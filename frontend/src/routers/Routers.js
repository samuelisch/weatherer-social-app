import React from 'react'
import Home from '../components/home/Home'
import Main from '../components/main/Main'
import Login from '../components/home/login/Login'
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
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/main" element={
          <ProtectedRoute>
            <Main />
          </ProtectedRoute>
        }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Routers