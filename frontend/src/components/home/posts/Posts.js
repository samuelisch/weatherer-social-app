import React from 'react'
import PostForm from './PostForm'
import PostsList from './PostsList'
import styled from 'styled-components'

const StyledContentTop = styled.div`
  padding: 10px;
  border: 1px solid rgb(85, 85, 85);
  border-width: 0 1px;

  h2 {
    margin: 0;
  }
`

const Posts = () => {
  return (
    <>
      <StyledContentTop>
          <h2>Home</h2>
          <PostForm />
        </StyledContentTop>
      <PostsList />
    </>
  )
  }

export default Posts