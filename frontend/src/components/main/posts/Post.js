import React, { useState } from 'react'
import Button from '../../assets/Button'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const StyledItem = styled.li`
  border: 1px solid rgb(85, 85, 85);
  padding: 10px;

  .postLikeButton {
    background-color: ${props => props.liked ? 'rgb(173, 226, 230)' : 'rgb(215, 215, 215)'};
  }
`


const Post = ({ post, handleLikePost, handleUnlikePost, handleDeletePost, userLiked }) => {
  const [isLiked, setIsLiked] = useState(userLiked)
  const postAuthor = post.user[0]

  const handleLikeButton = () => {
    if (isLiked) {
      handleUnlikePost()
    } else {
      handleLikePost()
    }
    setIsLiked(!isLiked)
  }

  return (
    <StyledItem liked={isLiked}>
      <div>
        content: {post.content}
      </div>
      <div>
        likes: {post.likes}
      </div>
      <Button className="postLikeButton" text="like" handleClick={handleLikeButton} />
      <Button className="postDeleteButton" text="delete" handleClick={handleDeletePost} />
      <div>
        by: <Link to={`${postAuthor.username}`}>{postAuthor.username}</Link>
      </div>
    </StyledItem>
  )
}

export default Post