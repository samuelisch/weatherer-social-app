import React, { useState } from 'react'
import Button from '../../assets/Button'
import styled from 'styled-components'
import { useNavigate, Link } from 'react-router-dom'

const StyledItem = styled.li`
  border: 1px solid rgb(85, 85, 85);
  padding: 10px;

  &:hover {
    cursor: pointer;
  }

  .postLikeButton {
    background-color: ${props => props.liked ? 'rgb(173, 226, 230)' : 'rgb(215, 215, 215)'};
  }

  .postLikeButton:hover {
    background-color: rgb(120, 200, 200);
  }

  .button:hover {
    cursor: pointer;
  }

  span:hover {
    cursor: pointer;
    text-decoration: underline;
  }
`


const Post = ({ post, handleLikePost, handleUnlikePost, handleDeletePost, userLiked }) => {
  const [isLiked, setIsLiked] = useState(userLiked)
  const postAuthor = post.user[0]
  const navigate = useNavigate()

  const handleLikeButton = (e) => {
    e.stopPropagation()
    if (isLiked) {
      handleUnlikePost()
    } else {
      handleLikePost()
    }
    setIsLiked(!isLiked)
  }

  const handleDeleteButton = (e) => {
    e.stopPropagation()
    handleDeletePost()
  }

  const viewUser = (e) => {
    e.stopPropagation()
    navigate(`/main/${postAuthor.username}`)
  }

  const viewPost = () => {
    navigate(`/main/${postAuthor.username}/${post.id}`)
  }

  return (
    <StyledItem liked={isLiked} onClick={viewPost}>
      <div>
        content: {post.content}
      </div>
      <div>
        likes: {post.likes}
      </div>
      <Button className="button postLikeButton" text="like" handleClick={handleLikeButton} />
      <Button className="button postDeleteButton" text="delete" handleClick={handleDeleteButton} />
      <div>
        by: <span onClick={viewUser}>{postAuthor.username}</span>
      </div>
    </StyledItem>
  )
}

export default Post