import React, { useEffect } from 'react'
import Button from '../assets/Button'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { Outlet } from 'react-router-dom'
import { initializeUsers } from '../../reducers/userReducer'
import { useDispatch } from 'react-redux'

const StyledMain = styled.div`
  margin-top: 150px;
  padding-left: 30px;
  position: relative;
  max-width: 500px;
  background-color: rgb(10, 10, 10);
  color: rgb(225, 225, 225);

  .mainTitle {
    font-size: 5.5rem;
  }

  .mainCaption {
    font-size: 2.7rem;
  }

  .testText {
    font-size: 1.5rem;
  }

  button {
    padding: 8px 0;
    border: none;
    border-radius: 15px;
    width: 200px;
    margin: 10px 0;
    font-weight: bold;
  }

  button:hover {
    background-color: rgb(205, 205, 205);
    cursor: pointer;
  }

  .signupButton {
    background-color: rgb(110, 230, 100);

    &:hover {
      background-color: rgb(100, 200, 100);
    }
  }

  .loginButton {
    background-color: rgb(10, 10, 10);
    color: rgb(110, 180, 100);
    border: 1px solid rgba(205, 225, 205, 0.4);

    &:hover {
      background-color: rgba(10, 130, 10, 0.1);
    }
  }
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
        <h1 className="mainTitle">So, how's the weather?</h1>
        <h2 className="mainCaption">Join Weatherer today.</h2>
        <div>
        <Button
          className="signupButton"
          type="button"
          text="Sign up"
          handleClick={() => navigate('/signup')}
        />
        </div>
        <div>
        <Button 
          className="loginButton"
          type="button"
          text="Log in"
          handleClick={() => navigate('/login')}
        />
        </div>
        <h3 className="testText">Testing the app?</h3>
        <Button 
          className="guestLoginButton"
          type="button"
          text="Log in as guest"
          //handleClick={() => navigate('/login')} Handle this with login guest account
        />
      </StyledMain>
      <Outlet />
    </div>
  )
}

export default Main