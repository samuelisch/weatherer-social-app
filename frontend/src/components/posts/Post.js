import React from 'react'
import Button from '../assets/Button'

const Post = ({ id, post }) => {
  return (
    <li>
      content: {post.content} likes: {post.likes}
      <Button text="like" handleClick="" />
    </li>
  )
}

export default Post