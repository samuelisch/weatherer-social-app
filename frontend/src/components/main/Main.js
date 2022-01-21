import React, { useEffect } from 'react'
import Button from '../assets/Button'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { Outlet } from 'react-router-dom'
import { initializeUsers } from '../../reducers/userReducer'
import { useDispatch } from 'react-redux'

const StyledMain = styled.div`
  padding-left: 10px;
  position: relative;
`

const Main = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const authenticated = window.localStorage.getItem('loggedAppUser')

  useEffect(() => {
    if (authenticated) {
      navigate('/home')
    }
  }, [authenticated, navigate])

  useEffect(() => {
    dispatch(initializeUsers())
  })

  return (
    <div>
      <StyledMain>
        <h1>Join Weatherer today.</h1>
        <Button
          type="button"
          text="Sign up"
          handleClick={() => navigate('/signup')}
        />
        <h3>Have an exisitng account?</h3>
          <Button 
            type="button"
            text="Log in"
            handleClick={() => navigate('/login')}
          />
      </StyledMain>
      <Outlet />
    </div>
  )
}

export default Main