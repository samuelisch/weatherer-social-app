import React, { useState, useEffect } from 'react'
import LoginForm from './login/LoginForm'
import Button from '../assets/Button'
import Container from './Container'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'

const StyledHome = styled.div`
  padding-left: 10px;
  position: relative;
`

const Home = () => {
  const navigate = useNavigate()
  const [signUp, setSignUp] = useState(false)
  const authenticated = window.localStorage.getItem('loggedAppUser')

  useEffect(() => {
    if (authenticated) {
      navigate('/main')
    }
  }, [authenticated, navigate])

  const signupUser = () => {
    setSignUp(true)
  }

  return (
    <div>
      <StyledHome>
        <h1>Join Weatherer today.</h1>
        <Button
          type="button"
          text="Sign up"
          handleClick={signupUser}
        />
        <h3>Have an exisitng account?</h3>
          <Button 
            type="button"
            text="Log in"
            handleClick={() => navigate('/login')}
          />
      </StyledHome>
      {signUp &&
        <Container>
          <LoginForm />
        </Container>
      }
    </div>
  )
}

export default Home