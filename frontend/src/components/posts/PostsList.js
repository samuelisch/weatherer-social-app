import React, { useEffect } from 'react'
import Post from './Post'
import { useSelector, useDispatch } from 'react-redux'
import { initializePosts } from '../../reducers/postReducer'

const PostsList = () => {
  const dispatch = useDispatch()
  const posts = useSelector(state => state.posts)

  useEffect(() => {
    dispatch(initializePosts())
  }, [dispatch])

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