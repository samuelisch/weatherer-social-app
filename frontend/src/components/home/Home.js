import React, { useEffect } from 'react'
import Button from '../assets/Button'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { Outlet } from 'react-router-dom'

const StyledHome = styled.div`
  padding-left: 10px;
  position: relative;
`

const Home = () => {
  const navigate = useNavigate()
  const authenticated = window.localStorage.getItem('loggedAppUser')

  useEffect(() => {
    if (authenticated) {
      navigate('/main')
    }
  }, [authenticated, navigate])

  return (
    <div>
      <StyledHome>
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
      </StyledHome>
      <Outlet />
    </div>
  )
}

export default Home