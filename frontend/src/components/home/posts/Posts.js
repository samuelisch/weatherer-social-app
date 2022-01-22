import React from 'react'
import PostForm from './PostForm'
import PostsList from './PostsList'
import styled from 'styled-components'
import Button from '../../assets/Button'
import { logoutUser } from '../../../reducers/loginReducer'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'


const StyledContentTop = styled.div`
  padding: 10px;
  border: 1px solid rgb(85, 85, 85);
  border-width: 0 1px;

  h2 {
    margin: 0;
  }
`

const Posts = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleLogout = async () => {
    navigate('/main')
    await dispatch(logoutUser())
  }

  return (
    <>
      <StyledContentTop>
          <h2>Home</h2>
          <Button type='button' text='logout' handleClick={handleLogout} />
          <PostForm />
        </StyledContentTop>
      <PostsList />
    </>
  )
  }

export default Posts