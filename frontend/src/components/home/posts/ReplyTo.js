import React from 'react'
import styled from 'styled-components'
import { getPostFromId } from '../../../reducers/postReducer'
import { useSelector } from 'react-redux'
import Post from './Post'

const StyledContainer = styled.div`
  border-left: 1px solid rgb(85, 85, 85);
`

const StyledParent = styled.div`
  padding: 10px 0 20px 20px;
`

const ReplyTo = ({ postId }) => {
  const post = useSelector(({ posts }) => getPostFromId(posts, postId))

  return (
    <StyledContainer>
      <StyledParent>
        {post 
          ? <Post post={post} />
          : <h2>Post has been removed.</h2> 
        }
      </StyledParent>
    </StyledContainer>
  )
}

export default ReplyTo
