import React from 'react'
import styled from 'styled-components'
import Button from '../../assets/Button'
import { useNavigate } from 'react-router-dom'

const SinglePost = ({ post }) => {
  const navigate = useNavigate()

  const handleReply = () => {
    navigate('reply')
  }

  return (
    <div>
      <p>Content: {post.content}</p>
      <p>Likes: {post.likes}</p>
      <p>by: {post.user.username}</p>
      <Button className="replyButton" text="Reply" handleClick={handleReply} />
    </div>
  )
}

export default SinglePost