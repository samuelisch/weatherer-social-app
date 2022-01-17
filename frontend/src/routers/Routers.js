import React from 'react'
import Home from '../components/home/Home'
import Main from '../components/main/Main'
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
        <Route path="/" element={
          <ProtectedRoute>
            <Main />
          </ProtectedRoute>
        }
        />
        <Route path="/home" element={<Home />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Routers