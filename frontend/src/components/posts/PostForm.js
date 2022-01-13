import React from 'react'
import Input from '../assets/Input'
import { useDispatch } from 'react-redux'
import { createPost } from '../../reducers/postReducer'
import Button from '../assets/Button'

const PostForm = () => {
  const dispatch = useDispatch()

  const submitHandler = (e) => {
    e.preventDefault()
    const content = e.target.content.value
    e.target.content.value = ''
    dispatch(createPost(content))
  }

  return(
    <form onSubmit={submitHandler}>
      Add post 
      <Input
        name="content"
        type="text"
        placeholder="content"
      />
      <Button 
        type="submit"
        text="create"
      />
    </form>
  )
}

export default PostForm