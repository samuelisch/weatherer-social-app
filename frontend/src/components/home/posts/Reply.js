import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Container from '../../assets/Container'
import Button from '../../assets/Button'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { replyPost } from '../../../reducers/postReducer'
import { closeModal } from '../../../reducers/modalReducer'

const StyledText = styled.div`
  color: rgb(245, 245 ,245);
`

const Reply = ({ post }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    if (post) {
      setIsLoaded(true)
    }
  }, [post])

  const handleReply = (e) => {
    e.preventDefault()
    const content = e.target.replyInput.value
    e.target.replyInput.value = ''
    dispatch(replyPost(content, post.id))
    dispatch(closeModal())
    navigate(`/home/post/${post.id}`)
  }

  return (
    <Container type="reply">
      {isLoaded && 
        <StyledText>
        <p>content: {post.content}</p>
        <p>likes: {post.likes}</p>
        <p>by: {post.user.username}</p>
        <form onSubmit={handleReply}>
          <div>
            <textarea
              id="replyInput"
              name="replyInput"
              placeholder="Reply"
            />
          </div>
          <Button type="submit" text="Submit reply" />
        </form>
        </StyledText>
      }
    </Container>
  )
}

export default Reply