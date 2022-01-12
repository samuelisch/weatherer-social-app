import React, { useState, useEffect } from 'react'
import postService from '../../services/post'
import Post from './Post'

const PostsList = () => {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    postService
      .getAll()
      .then(returnedPosts => {
        setPosts(returnedPosts)
      })
  },[])

  const postsToRender = posts.map(post => (
    <Post 
      key={post.id}
      post={post}
    />
  ))

  return (
    <ul>
      {postsToRender}
    </ul>
  )
}

export default PostsList