import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Container from '../../assets/Container'
import ReplyForm from './ReplyForm'

const StyledText = styled.div`
  color: rgb(245, 245 ,245);
  width: 80%;
  margin-top: 20px;
`

const StyledNameRow = styled.div`
  display: flex;

  .name {
    margin-right: 5px;
    font-size: 1.4rem;
    font-weight: bold;
  }

  .username {
    color: rgb(150, 150, 150);
    font-size: 1.3rem;
  }
`

const StyledContent = styled.div`
  padding: 5px 0 10px;
  font-size: 1.3rem;
`


const Reply = ({ post }) => {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    if (post) {
      setIsLoaded(true)
    }
  }, [post])

  return (
    <Container type="reply">
      {isLoaded && 
        <StyledText>
          <StyledNameRow>
            <div className="nameDetails">
              <span className="name">{post.user.name}</span>
              <span className="username">@{post.user.username}</span>
            </div>
          </StyledNameRow>
        <StyledContent>
          {post.content}
        </StyledContent>
        <ReplyForm post={post} modal="true" />
        </StyledText>
      }
    </Container>
  )
}

export default Reply