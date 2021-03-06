import React, { useEffect } from 'react'
import Button from '../assets/Button'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { createUser, initializeUsers } from '../../reducers/userReducer'
import { useDispatch, useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSmog } from '@fortawesome/free-solid-svg-icons'
import { openModal } from '../../reducers/modalReducer'
import Signup from './signup/Signup'
import Login from './login/Login'
import { loginUser } from '../../reducers/loginReducer'
import { generatePassword } from '../assets/generator'

const StyledPage = styled.div`
  display: flex;
  justify-content: start;

  @media (min-width: 1240px) {
    justify-content: center;
  }
`

const StyledContainer = styled.div`
  padding: 30px 40px;
  position: relative;
  display: flex;

`

const StyledMain = styled.div`
  margin-top: 120px;
  max-width: 500px;
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
    background-color: transparent;
    color: rgb(110, 180, 100);
    border: 1px solid rgba(205, 225, 205, 0.4);

    &:hover {
      background-color: rgba(10, 130, 10, 0.1);
    }
  }

  @media (min-width: 1240px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
`

const StyledIcon = styled.div`
  position: absolute;
`

const Main = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const authenticated = window.localStorage.getItem('loggedAppUser')
  const modal = useSelector(state => state.modal)

  useEffect(() => {
    if (authenticated) {
      navigate('/home')
    }
  }, [authenticated, navigate])

  useEffect(() => {
    dispatch(initializeUsers())
  })

  const createGuestUser = async () => {
    const randNum = Math.floor(Math.random() * 1000000)
    const username = `guest${randNum}`
    const name = `Guest ${randNum}`
    const password = generatePassword(20)
    await dispatch(createUser({name, username, password}))
    return {name, username, password}
  }

  const loginGuestUser = async () => {
    const guest = await createGuestUser()
    await dispatch(loginUser(guest))
    navigate('/home')
  }

  return (
    <StyledPage>
      <StyledContainer>
        <StyledIcon>
          <FontAwesomeIcon icon={faSmog} size="3x" />
        </StyledIcon>
        <StyledMain>
          <h1 className="mainTitle">So, how's the weather?</h1>
          <h2 className="mainCaption">Join Weatherer today.</h2>
          <div>
          <Button
            className="signupButton"
            type="button"
            text="Sign up"
            handleClick={() => dispatch(openModal('signup'))}
          />
          </div>
          <div>
          <Button 
            className="loginButton"
            type="button"
            text="Log in"
            handleClick={() => dispatch(openModal('login'))}
          />
          </div>
          <h3 className="testText">Testing the app? Use a temporary guest account.</h3>
          <Button 
            className="guestLoginButton"
            type="button"
            text="Log in as guest"
            handleClick={loginGuestUser}
          />
        </StyledMain>
      </StyledContainer>
      {modal && modal.type === 'signup'
        ? <Signup />
        : modal && modal.type === 'login'
        ? <Login />
        : ''
      }
    </StyledPage>
  )
}

export default Main