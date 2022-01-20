import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Container from '../../assets/Container'
import Button from '../../assets/Button'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getPostFromId, replyPost } from '../../../reducers/postReducer'

const StyledText = styled.div`
  color: rgb(245, 245 ,245);
`

const Reply = () => {
  const dispatch = useDispatch()
  const [isLoaded, setIsLoaded] = useState(false)
  const params = useParams()
  const { postId } = params
  const post = useSelector(state => getPostFromId(state.posts, postId))

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
  }

  return (
    <Container>
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