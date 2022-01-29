import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { initializeLogin } from '../../reducers/loginReducer'
import { initializeUsers } from '../../reducers/userReducer'
import { initializePosts } from '../../reducers/postReducer'
import Navbar from './navbar/Navbar'
import styled from 'styled-components'
import Content from './Content'
import Modal from './posts/Modal'

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
    dispatch(initializeLogin())
    dispatch(initializeUsers())
    dispatch(initializePosts())
  }, [dispatch])

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