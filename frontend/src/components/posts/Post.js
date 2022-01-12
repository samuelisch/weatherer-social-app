import React from 'react'

const Post = ({ id, post }) => {
  return (
    <li>user: {post.username} content: {post.content}</li>
  )
}

export default Post