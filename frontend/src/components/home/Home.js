import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { initializeLogin } from '../../reducers/loginReducer'
import { initializeUsers } from '../../reducers/userReducer'
import { initializePosts } from '../../reducers/postReducer'
import Navbar from './navbar/Navbar'
import styled from 'styled-components'
import Content from './Content'
import { Outlet } from 'react-router-dom'

const StyledHome = styled.div`
  max-width: 1440px;
  height: 100vh;
  margin: 0 auto;
  display: flex;
`

const Home = () => {
  const [isLoaded, setIsLoaded] = useState(false)
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

  return (
    <>
      <StyledHome>
        <Navbar user={user} />
        {isLoaded &&
          <Content />
        }
      </StyledHome>
      <Outlet />
    </>
  )
}

export default Home