import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { initializeLogin } from '../../reducers/loginReducer'
import { Outlet } from 'react-router-dom'
import { initializeUsers } from '../../reducers/userReducer'
import { initializePosts } from '../../reducers/postReducer'
import Navbar from './navbar/Navbar'
import styled from 'styled-components'

const StyledHome = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  display: flex;
`

const StyledContent = styled.div`
  flex: 6 1 0;
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
      <StyledHome>
        <Navbar />
        <StyledContent>
          {isLoaded &&
            <Outlet />
          }
        </StyledContent>
      </StyledHome>
  )
}

export default Home