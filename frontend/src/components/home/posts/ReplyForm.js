import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Textbox from '../../assets/Textbox'
import Button from '../../assets/Button'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { replyPost } from '../../../reducers/postReducer'
import { closeModal } from '../../../reducers/modalReducer'
import { logoutUser } from '../../../reducers/loginReducer'
import { triggerNotification } from '../../../reducers/notificationReducer'

const StyledForm = styled.form`
  display: flex;
  align-items: flex-end;
`

const StyledTextbox = styled(Textbox)`
  margin: 10px 0;
  width: 100%;
  background: transparent;
  border: none;
  font-family: Helvetica;
  font-size: 1.7rem;
  resize: none;
  height: 24px;
  color: rgb(230, 230, 230);

  &:focus {
    outline: none;
  }
`

const StyledButton = styled(Button)`
  padding: 8px 15px;
  border: none;
  border-radius: 20px;
  background-color: rgba(90, 200, 90);
  color: rgb(230, 230, 230);

  &:hover {
    background-color: rgba(90, 190, 90);
  }

  &:disabled {
    opacity: 50%;

    &:hover {
      background-color: rgba(90, 200, 90);
    }
  }
`

const ReplyForm = ({ post, modal }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [textboxValue, setTextboxValue] = useState('')
  const [buttonDisabled, setButtonDisabled] = useState(true)

  useEffect(() => {
    if (textboxValue) {
      setButtonDisabled(false)
    } else {
      setButtonDisabled(true)
    }
  }, [textboxValue])

  const handleInputChange = (e) => {
    const textbox = e.target
    textbox.style.height = 0;
    textbox.style.height = textbox.scrollHeight + "px"
  }

  const submitHandler = async (e) => {
    e.preventDefault()
    try {
      const content = textboxValue
      setTextboxValue('')
      e.target.replyContent.value = ''
      setButtonDisabled(true)
      await dispatch(replyPost(content, post.id))
    } catch (error) {
      navigate('/')
      await dispatch (logoutUser())
      dispatch(triggerNotification('Session expired: Please log in again', false))
    }
    if (modal) {
      await dispatch(closeModal())
      navigate(`/home/post/${post.id}`)
    }
  }

  return (
    <StyledForm onSubmit={submitHandler}>
      <StyledTextbox
        className="newReplyInput"
        name="replyContent"
        value={textboxValue}
        handleChange={(e) => setTextboxValue(e.target.value)}
        placeholder="Reply to post"
        handleInput={handleInputChange}
      />
      <StyledButton 
        className="newReplyButton"
        type="submit"
        text="Reply"
        disabled={buttonDisabled}
      />
    </StyledForm>
  )
}

export default ReplyForm