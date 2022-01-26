import React from 'react'
import styled from 'styled-components'
import Button from '../../assets/Button'
import PostIcons from './PostIcons'

const StyledContainer = styled.div`
  padding: 10px;
  border: 1px solid rgb(85, 85, 85);
  border-width: 0 1px;

  hr {
    border: none;
    border-top: 1px solid rgb(85, 85, 85);
  }
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

    &:hover {
      text-decoration: none;
    }
  }

  .nameDetails:hover {
    cursor: pointer;
  }

  .nameDetails:hover > .name {
    text-decoration: underline;
  }
`

const StyledContent = styled.div`
  padding: 5px 0 10px;
  font-size: 1.5rem;
`

const SinglePost = ({ post, user }) => {
  return (
    <StyledContainer>
      <h2>
        Thread
      </h2>
      <StyledNameRow>
        <div className="nameDetails">
            <div className="name">{post.user.name}</div>
            <div className="username">@{post.user.username}</div>
        </div>
      </StyledNameRow>
      <StyledContent>
        {post.content}
      </StyledContent>
      <hr />
      <PostIcons post={post} user={user} />
      <hr />
      <Button className="replyButton" text="Reply" />
    </StyledContainer>
  )
}

export default SinglePost