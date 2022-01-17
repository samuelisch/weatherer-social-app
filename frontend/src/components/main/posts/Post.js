import React from 'react'
import Button from '../../assets/Button'

const Post = ({ post, handleLikePost, handleDeletePost }) => {
  return (
    <li>
      content: {post.content} likes: {post.likes}
      <Button text="like" handleClick={handleLikePost} />
      <Button text="delete" handleClick={handleDeletePost} />
    </li>
  )
}

export default Post