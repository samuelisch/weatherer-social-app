import React from 'react'
import Input from '../../assets/Input'
import Button from '../../assets/Button'
import { useDispatch } from 'react-redux'
import { loginUser } from '../../../reducers/loginReducer'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { closeModal } from '../../../reducers/modalReducer'
import { triggerNotification } from '../../../reducers/notificationReducer'

const StyledContainer = styled.div`
  width: 200px;
`

const StyledHeader = styled.h2`
  font-size: 2rem;
  color: rgb(245, 245, 245);
`

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 40px 0 40px;
  min-height: 120px;

  .loginInput {
    width: 95%;
    background-color: rgb(15, 15, 15);
    color: rgb(245, 245, 245);
    margin-bottom: 10px;
    border-radius: 4px;
    border: 1px solid rgb(110, 110, 110);
    padding: 8px 3px;
  }

  .loginButton {
    margin-top: 20px;
    padding: 10px;
    border-radius: 15px;
    border: none;
    background: rgb(110, 180, 100);
    color: rgb(10, 10, 10);
    font-weight: bold;
  }

  .loginButton:hover {
    background: rgb(85, 180, 85);
    cursor: pointer;
  }
`

const StyledText = styled.p`
  font-size: 1.1rem;
  color: rgb(110, 110, 110);
  display: flex;
  align-items: center;
  
  span {
    margin-left: 5px;
    color: rgb(120, 210, 250)
  }

  span:hover {
    text-decoration: underline;
    cursor: pointer;
  }
`

const LoginForm = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const loginHandler = async (e) => {
    e.preventDefault()
    const username = e.target.loginUsername.value.toLowerCase()
    const password = e.target.loginPassword.value

    try {
      await dispatch(loginUser({username, password}))
      dispatch(closeModal())
      navigate('/main')
    } catch (error) {
      dispatch(triggerNotification(error.response.data.error, true))
    }

    e.target.reset()
  }

  return (
      <StyledContainer>
        <StyledHeader>Log in to Weatherer</StyledHeader>
        <StyledForm onSubmit={loginHandler}>
          <div>
            <div>
              <Input
                className="loginInput"
                name='loginUsername'
                id='loginUsername'
                type='text'
                placeholder='Username'
              />
            </div>
            <div>
              <Input
                className="loginInput"
                name='loginPassword'
                id='loginPassword'
                type='password'
                placeholder='Password'
              />
            </div>
          </div>
          <Button className="loginButton" type='submit' text='Login' />
        </StyledForm>
        <StyledText>Don't have an account?<span onClick={() => navigate('/signup')}>Sign up</span></StyledText>
      </StyledContainer>
  )
}

export default LoginForm