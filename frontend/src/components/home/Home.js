import React, { useState } from 'react'
import LoginForm from './login/LoginForm'
import Button from '../assets/Button'
import Container from './Container'

const Home = () => {
  const [loggingIn, setLoggingIn] = useState(false)

  return (
    <div>
      <h1>Join Weatherer today.</h1>
      <div>
        <h3>Have an exisitng account?</h3>
          <Button 
            type="button"
            text="Log in"
            handleClick={() => setLoggingIn(!loggingIn)}
          />
      </div>
      {loggingIn &&
        <Container>
          <LoginForm />
        </Container>
      }
    </div>
  )
}

export default Home