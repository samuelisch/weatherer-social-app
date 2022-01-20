import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Button from '../assets/Button'
import { initializeLogin, logoutUser } from '../../reducers/loginReducer'
import { useNavigate, Outlet } from 'react-router-dom'
import { initializeUsers } from '../../reducers/userReducer'
import { initializePosts } from '../../reducers/postReducer'

const Main = () => {
  const [isLoaded, setIsLoaded] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const users = useSelector(state => state.users)
  const user = useSelector(state => state.login)

  useEffect(() => {
    if (users && user) {
      setIsLoaded(true)
    } else {
      setIsLoaded(false)
    }
  }, [users, user])

  useEffect(() => {
    dispatch(initializeLogin())
    dispatch(initializeUsers())
    dispatch(initializePosts())
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
          <Outlet />
          </div>
        }
      </div>
  )
}

export default Main