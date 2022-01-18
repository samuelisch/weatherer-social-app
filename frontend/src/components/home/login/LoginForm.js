import React from 'react'
import Input from '../../assets/Input'
import Button from '../../assets/Button'
import { useDispatch } from 'react-redux'
import { loginUser } from '../../../reducers/loginReducer'
import { useNavigate } from 'react-router-dom'

const LoginForm = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const loginHandler = async (e) => {
    e.preventDefault()
    const username = e.target.loginUsername.value
    const password = e.target.loginPassword.value

    try {
      await dispatch(loginUser({username, password}))
      navigate('/')
    } catch (error) {
      console.log(error)
    }

    e.target.reset()
  }

  return (
      <>
        <h2>Login</h2>
        <form onSubmit={loginHandler}>
          <div>
            <Input
              name='loginUsername'
              id='loginUsername'
              type='text'
              placeholder='Username'
            />
          </div>
          <div>
            <Input 
              name='loginPassword'
              id='loginPassword'
              type='password'
              placeholder='Password'
            />
          </div>
          <Button type='submit' text='login' />
        </form>
      </>
  )
}

export default LoginForm