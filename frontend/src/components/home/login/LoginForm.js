import React from 'react'
import Input from '../../assets/Input'
import Button from '../../assets/Button'
import { useDispatch } from 'react-redux'
import { loginUser, logoutUser } from '../../../reducers/loginReducer'

const LoginForm = () => {
  const dispatch = useDispatch()

  const loginHandler = async (e) => {
    e.preventDefault()
    const username = e.target.loginUsername.value
    const password = e.target.loginPassword.value

    try {
      await dispatch(loginUser({username, password}))
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
        <Button type='button' text='logout' handleClick={() => dispatch(logoutUser())} />
      </>
  )
}

export default LoginForm