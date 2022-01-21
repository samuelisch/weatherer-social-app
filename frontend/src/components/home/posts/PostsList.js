import React, { useState, useEffect } from 'react'
import Post from './Post'
import { useSelector, useDispatch } from 'react-redux'
import { likePost, unlikePost, deletePost } from '../../../reducers/postReducer'

const PostsList = ({ filter, type }) => {
  const [filteredPosts, setFilteredPosts] = useState([])
  const dispatch = useDispatch()
  const posts = useSelector(state => state.posts)
  const user = useSelector(state => state.login)

  useEffect(() => {
    if (type === 'userId') {
      setFilteredPosts(posts.filter(post => post.user.id === filter))
    } else if (type === 'replies') {
      const replyIds = posts.find(post => post.id === filter).replies
      setFilteredPosts(posts.filter(post => replyIds.includes(post.id)))
    } else {
      setFilteredPosts(posts.filter(post => !post.replyToPost))
    }
  }, [type, posts, filter])

  const likePostHandler = async (post) => {
    await dispatch(likePost(post))
  }

  const unlikePostHandler = async (post) => {
    await dispatch(unlikePost(post))
  }

  const deletePostHandler = async (id) => {
    await dispatch(deletePost(id))
  }

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