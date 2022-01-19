import React, { useEffect } from 'react'
import Post from './Post'
import { useSelector, useDispatch } from 'react-redux'
import { initializePosts, likePost, unlikePost, deletePost } from '../../../reducers/postReducer'

const PostsList = ({ userId }) => {
  const dispatch = useDispatch()
  const posts = useSelector(state => state.posts)
  const user = useSelector(state => state.login)

  useEffect(() => {
    dispatch(initializePosts())
  }, [dispatch])

  const likePostHandler = async (post) => {
    await dispatch(likePost(post))
  }

  const unlikePostHandler = async (post) => {
    await dispatch(unlikePost(post))
  }

  const deletePostHandler = async (id) => {
    await dispatch(deletePost(id))
  }

  const filteredPosts = userId ? posts.filter(post => post.user[0].id === userId) : posts

  const postsToRender = filteredPosts.map(post => {
    return (
      <Post 
        key={post.id}
        post={post}
        handleLikePost={() => likePostHandler(post)}
        handleUnlikePost={() => unlikePostHandler(post)}
        handleDeletePost={() => deletePostHandler(post.id)}
        userLiked={user.likedPosts.includes(post.id)}
      />
    )
  })

  return (
    <ul>
      {postsToRender}
    </ul>
  )
}

export default PostsList