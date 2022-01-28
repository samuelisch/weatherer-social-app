import React from 'react'
import Input from '../../assets/Input'
import Button from '../../assets/Button'
import { useDispatch } from 'react-redux'
import { createUser } from '../../../reducers/userReducer'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { closeModal } from '../../../reducers/modalReducer'

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

  .signupInput {
    width: 95%;
    background: inherit;
    color: rgb(245, 245, 245);
    margin-bottom: 10px;
    border-radius: 4px;
    border: 1px solid rgb(110, 110, 110);
    padding: 8px 3px;
  }

  .signupButton {
    margin-top: 20px;
    padding: 10px;
    border-radius: 15px;
    border: none;
    background: rgb(110, 180, 100);
    color: rgb(10, 10, 10);
    font-weight: bold;
  }

  .signupButton:hover {
    background: rgb(85, 180, 85);
    cursor: pointer;
  }
`

const SignupForm = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const signupHandler = async (e) => {
    e.preventDefault()
    const newName = e.target.signupName.value
    const newUsername = e.target.signupUsername.value
    const newPassword = e.target.signupPassword.value

    const newUser = {
      name: newName,
      username: newUsername,
      password: newPassword
    }

    try {
      await dispatch(createUser(newUser))
      e.target.reset()
      console.log('success')
      dispatch(closeModal())
      navigate('/login')
    } catch (error) {
      console.log(error)
    }

    e.target.signupPassword.value = ''
  }

  return (
    <StyledContainer>
      <StyledHeader>Create your account</StyledHeader>
      <StyledForm onSubmit={signupHandler}>
        <div>
          <div>
          <Input
              className="signupInput"
              name="signupName"
              id="signupName"
              type="text"
              placeholder="Name"
            />
          </div>
          <div>
            <Input
              className="signupInput"
              name="signupUsername"
              id="signupUsername"
              type="text"
              placeholder="New username"
            />
          </div>
          <div>
            <Input
              className="signupInput"
              name="signupPassword"
              id="signupPassword"
              type="password"
              placeholder="New password"
            />
          </div>
          {/*<div>
            <Input
              className="signupInput"
              name="signupPassword2"
              id="signupPassword2"
              type="password"
              placeholder="Confirm password"
            />
          </div>*/''}
        </div>
        <Button className="signupButton" type="submit" text="Sign up" />
      </StyledForm>
    </StyledContainer>
  )
}

export default SignupForm