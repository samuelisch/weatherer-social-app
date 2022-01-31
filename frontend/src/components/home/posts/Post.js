import React from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { getPostFromId } from '../../../reducers/postReducer'
import PostIcons from './PostIcons'
import TimeAgo from '../../assets/TimeAgo'

const StyledContainer = styled.div`
  &:hover {
    cursor: pointer;
  }
`

const StyledReplyText = styled.div`
  color: rgb(150, 150, 150);
  margin-bottom: 5px;
`

const StyledNameRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

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

  .nameDetails:hover > .name {
    text-decoration: underline;
  }
`

const StyledContent = styled.div`
  padding: 5px 0 10px;
  font-size: 1.3rem;
  word-wrap: break-word;
`

const Post = ({ post }) => {
  const postAuthor = post.user
  const replyPostId = post.replyToPost
  const replyPost = useSelector(({ posts }) => getPostFromId(posts, replyPostId))
  const navigate = useNavigate()

  const viewUser = (e) => {
    e.stopPropagation()
    navigate(`/home/user/${postAuthor.username}`)
  }

  const viewPost = () => {
    navigate(`/home/post/${post.id}`)
  }

  return (
    <StyledContainer onClick={viewPost}>
      {replyPost && 
        <StyledReplyText>
          replying to @{replyPost.user.username}
        </StyledReplyText>
      }
      <StyledNameRow>
        <div className="nameDetails" onClick={viewUser}>
          <span className="name">{postAuthor.name}</span>
          <span className="username">@{postAuthor.username}</span>
        </div>
        <TimeAgo timestamp={post.date} />
      </StyledNameRow>
      <StyledContent>
        {post.content}
      </StyledContent>
      <PostIcons post={post} />
    </StyledContainer>
  )
}

export default Post