import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { initializeLogin, logoutUser } from '../../reducers/loginReducer'
import { initializeUsers } from '../../reducers/userReducer'
import { initializePosts } from '../../reducers/postReducer'
import Navbar from './navbar/Navbar'
import styled from 'styled-components'
import Content from './Content'
import Modal from './posts/Modal'
import { triggerNotification } from '../../reducers/notificationReducer'

const StyledHome = styled.div`
  max-width: 720px;
  height: 100vh;
  margin: 0 auto;
  display: flex;

  @media (min-width: 960px) {
    max-width: 950px;
  }
`

const Home = () => {
  const [isLoaded, setIsLoaded] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const users = useSelector(state => state.users)
  const user = useSelector(state => state.login)
  const modal = useSelector(state => state.modal)

  useEffect(() => {
    if (users && user) {
      setIsLoaded(true)
    } else {
      setIsLoaded(false)
    }
  }, [users, user])

  useEffect(() => {
    const getPosts = async () => {
      try {
        await dispatch(initializePosts())
      } catch (error) {
        navigate('/')
        dispatch (logoutUser())
        dispatch(triggerNotification('Session expired: Please log in again', false))
      }
    }

    dispatch(initializeLogin())
    getPosts()
    dispatch(initializeUsers())
  }, [dispatch, navigate])

  return (
    <>
      <StyledHome>
        {isLoaded &&
        <>
          <Navbar user={user} />
          <Content />
        </>
        }
      </StyledHome>
      {modal && 
        <Modal modal={modal} />
      }
    </>
  )
}

export default Home