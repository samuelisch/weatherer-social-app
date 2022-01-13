import React from 'react'
import Button from '../assets/Button'
import { useDispatch } from 'react-redux'
import { likePost, deletePost } from '../../reducers/postReducer'

const Post = ({ post }) => {
  const dispatch = useDispatch()

  return (
    <li>
      content: {post.content} likes: {post.likes}
      <Button text="like" handleClick={() => dispatch(likePost(post))} />
      <Button text="delete" handleClick={() => dispatch(deletePost(post.id))} />
    </li>
  )
}

export default Post