import React from 'react'
import styled from 'styled-components'
import PostIcons from './PostIcons'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import ReplyForm from './ReplyForm'
import TimeStamp from '../../assets/TimeStamp'

const StyledContainer = styled.div`
  padding: 10px;
  border: 1px solid rgb(85, 85, 85);
  border-width: 0 1px 1px;

  hr {
    border: none;
    border-top: 1px solid rgb(85, 85, 85);
  }

  .info {
    display: flex;
    align-items: center;
    margin-bottom: 15px;
  }

  .backIcon {
    padding: 7px;
    font-size: 1.5rem;
    border-radius: 50%;
    transition: background-color 0.2s;

    &:hover {
      cursor: pointer;
      background-color: rgba(215, 215, 215, 0.2);
    }
  }

  .description {
    margin: 0 15px;
    font-weight: bold;
    font-size: 1.8rem;
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
  padding: 10px 0 15px;
  font-size: 2rem;
`

const SinglePost = ({ post, user }) => {
  const navigate = useNavigate()

  const viewUser = () => {
    navigate(`/home/user/${post.user.username}`)
  }

  return (
    <StyledContainer>
      <div className="info">
        <FontAwesomeIcon className="backIcon" icon={faArrowLeft} onClick={() => navigate(-1)} />
        <span className="description">Thread</span>
      </div>
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