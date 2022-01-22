import React, { useState } from 'react'
import Button from '../../assets/Button'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'

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
  const postAuthor = post.user
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

  const handleReplyButton = (e) => {
    e.stopPropagation()
    navigate(`/home/post/${post.id}/reply`)
  }

  const viewUser = (e) => {
    e.stopPropagation()
    navigate(`/home/user/${postAuthor.username}`)
  }

  const viewPost = () => {
    navigate(`/home/post/${post.id}`)
  }

  return (
    <StyledItem liked={isLiked} onClick={viewPost}>
      <div>
        content: {post.content}
      </div>
      <div>
        likes: {post.likes}
      </div>
      <div>
        replies: {post.replies.length}
      </div>
      <Button className="button postLikeButton" text="like" handleClick={handleLikeButton} />
      <Button className="button postDeleteButton" text="delete" handleClick={handleDeleteButton} />
      <Button className="replyButton" text="reply" handleClick={handleReplyButton} />
      <div>
        by: <span onClick={viewUser}>{postAuthor.username}</span>
      </div>
    </StyledItem>
  )
}

export default Post