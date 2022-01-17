import React, { useEffect } from 'react'
import Post from './Post'
import { useSelector, useDispatch } from 'react-redux'
import { initializePosts, likePost, deletePost } from '../../../reducers/postReducer'

const PostsList = () => {
  const dispatch = useDispatch()
  const posts = useSelector(state => state.posts)

  useEffect(() => {
    dispatch(initializePosts())
  }, [dispatch])

  const likePostHandler = async (post) => {
    await dispatch(likePost(post))
  }

  const deletePostHandler = async (id) => {
    await dispatch(deletePost(id))
  }

  const postsToRender = posts.map(post => (
    <Post 
      key={post.id}
      post={post}
      handleLikePost={() => likePostHandler(post)}
      handleDeletePost={() => deletePostHandler(post.id)}
    />
  ))

  return (
    <ul>
      {postsToRender}
    </ul>
  )
}

export default PostsList