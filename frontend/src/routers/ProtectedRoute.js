import React from "react"
import { Navigate } from 'react-router-dom'
import { useDispatch } from "react-redux"
import { logoutUser } from "../reducers/loginReducer"

const ProtectedRoute = ({ children }) => {
  const dispatch = useDispatch()
  const logout = () => {
    dispatch(logoutUser())
    return <Navigate to="/" />
  }
  const authenticated = window.localStorage.getItem('loggedAppUser')
  return authenticated ? children : logout()
}

export default ProtectedRoute