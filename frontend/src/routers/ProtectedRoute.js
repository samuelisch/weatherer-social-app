import React from "react"
import { Navigate } from 'react-router-dom'
import jwtDecode from "jwt-decode"
import { useDispatch } from "react-redux"
import { logoutUser } from "../reducers/loginReducer"

const ProtectedRoute = ({ children }) => {
  const dispatch = useDispatch()

  const isValid = (token) => {
    const decoded = jwtDecode(token)
    let currentDate = new Date()
    if (decoded.exp * 1000 < currentDate.getTime()) {
      console.log('token expired')
      dispatch(logoutUser())
      return false;
    } else {
      console.log('token valid')
      return true
    }
  }

  const authenticated = isValid(window.localStorage.getItem('loggedAppUser'))
  return authenticated ? children : <Navigate to="/" />
}

export default ProtectedRoute