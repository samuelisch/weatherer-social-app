import React from 'react'
import styled from 'styled-components'
import PostIcons from './PostIcons'
import { useNavigate } from 'react-router-dom'
import ReplyForm from './ReplyForm'
import TimeStamp from '../../assets/TimeStamp'

const StyledContainer = styled.div`
  hr {
    border: none;
    border-top: 1px solid rgb(85, 85, 85);
  }
`

const StyledNameRow = styled.div`
  display: flex;

  .name {
    margin-right: 5px;
    font-size: 1.6rem;
    font-weight: bold;
  }

  .username {
    color: rgb(150, 150, 150);
    font-size: 1.4rem;

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
  padding: 5px 0;
  font-size: 2rem;
  word-wrap: break-word;
`

const SinglePost = ({ post, user }) => {
  const navigate = useNavigate()

  const viewUser = () => {
    navigate(`/home/user/${post.user.username}`)
  }

  return (
    <StyledContainer>
      <StyledNameRow>
        <div className="nameDetails" onClick={viewUser}>
            <div className="name">{post.user.name}</div>
            <div className="username">@{post.user.username}</div>
        </div>
      </StyledNameRow>
      <StyledContent>
        {post.content}
      </StyledContent>
      <TimeStamp timestamp={post.date} />
      <hr />
      <PostIcons post={post} user={user} />
      <hr />
      <ReplyForm post={post} />
    </StyledContainer>
  )
}

export default SinglePost