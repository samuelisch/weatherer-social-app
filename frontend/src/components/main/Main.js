import React, { useState, useEffect } from 'react'
import PostForm from './posts/PostForm'
import PostsList from './posts/PostsList'
import { useSelector, useDispatch } from 'react-redux'
import Button from '../assets/Button'
import { initializeLogin, logoutUser } from '../../reducers/loginReducer'
import { useNavigate } from 'react-router-dom'
import { initializeUsers } from '../../reducers/userReducer'

const Main = () => {
  const [isLoaded, setIsLoaded] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const user = useSelector(state => state.login)

  useEffect(() => {
    if (user) {
      setIsLoaded(true)
    } else {
      setIsLoaded(false)
    }
  }, [user])

  useEffect(() => {
    dispatch(initializeLogin())
  }, [dispatch])

  useEffect(() => {
    dispatch(initializeUsers())
  }, [dispatch])

  const handleLogout = async () => {
    navigate('/home')
    await dispatch(logoutUser())
  }

  return (
      <div className="main">
        {isLoaded &&
          <div>
            Welcome {user.username}
            <Button type='button' text='logout' handleClick={handleLogout} />
          <PostForm />
          <PostsList />
        </div>
        }
      </div>
  )
}

export default Main