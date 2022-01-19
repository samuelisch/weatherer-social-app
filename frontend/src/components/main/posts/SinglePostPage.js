import React from 'react'
import styled from 'styled-components'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { getPostFromId } from '../../../reducers/postReducer'

const SinglePostPage = () => {
  const params = useParams()
  const { username, postId } = params
  const post = useSelector(state => getPostFromId(state.posts, postId))

  return (
    <div>
      <p>Content: {post.content}</p>
      <p>Likes: {post.likes}</p>
      <p>by: {username}</p>
    </div>
  )

}

export default SinglePostPage