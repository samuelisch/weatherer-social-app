import React from 'react'
import Button from '../assets/Button'
import { useDispatch } from 'react-redux'
import { likePost } from '../../reducers/postReducer'

const Post = ({ id, post }) => {
  const dispatch = useDispatch()

  return (
    <li>
      content: {post.content} likes: {post.likes}
      <Button text="like" handleClick={() => dispatch(likePost(post))} />
    </li>
  )
}

export default Post