import React from "react"
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({ children }) => {
  const authenticated = window.localStorage.getItem('loggedAppUser')
  return authenticated ? children : <Navigate to="/home" />
}

export default ProtectedRoute