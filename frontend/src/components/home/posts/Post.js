import React from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import PostIcons from './PostIcons'

const StyledItem = styled.li`
  border: 1px solid rgb(85, 85, 85);
  border-width: 0 1px 1px;
  padding: 10px 15px 5px;

  &:hover {
    cursor: pointer;
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

  .nameDetails:hover > .name {
    text-decoration: underline;
  }
`

const StyledContent = styled.div`
  padding: 5px 0 10px;
  font-size: 1.3rem;
`

const Post = ({ post, user }) => {
  const postAuthor = post.user
  const navigate = useNavigate()

  const viewUser = (e) => {
    e.stopPropagation()
    navigate(`/home/user/${postAuthor.username}`)
  }

  const viewPost = () => {
    navigate(`/home/post/${post.id}`)
  }

  return (
    <StyledItem onClick={viewPost}>
      <StyledNameRow>
        <div className="nameDetails" onClick={viewUser}>
          <span className="name">{postAuthor.name}</span>
          <span className="username">@{postAuthor.username}</span>
        </div>
      </StyledNameRow>
      <StyledContent>
        {post.content}
      </StyledContent>
      <PostIcons post={post} user={user} />
    </StyledItem>
  )
}

export default Post