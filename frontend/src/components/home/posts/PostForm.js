import React, { useState } from 'react'
import styled from 'styled-components'
import Textbox from '../../assets/Textbox'
import { useDispatch } from 'react-redux'
import { createPost } from '../../../reducers/postReducer'
import Button from '../../assets/Button'
import { closeModal } from '../../../reducers/modalReducer'

const StyledForm = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
`

const StyledTextbox = styled(Textbox)`
  margin: ${props => props.modal ? '10px 30px 0' : '20px 0 10px'};
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

const StyledContainer = styled.div`
  padding: 0 10px;
  display: flex;
  justify-content: flex-end;
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

const PostForm = ({ modal }) => {
  const dispatch = useDispatch()
  const [textboxValue, setTextboxValue] = useState('')

  //text input height change to fit content solution taken from link: https://stackoverflow.com/a/48460773
  //manipulates height by adding scroll height
  const handleInputChange = (e) => {
    const textbox = e.target
    textbox.style.height = 0;
    textbox.style.height = textbox.scrollHeight + "px"
  }

  const submitHandler = (e) => {
    e.preventDefault()
    const content = e.target.content.value
    e.target.content.value = ''
    dispatch(createPost(content))
    if (modal) {
      dispatch(closeModal())
    }
  }

  return(
    <StyledForm onSubmit={submitHandler}>
      <StyledTextbox
        modal={modal}
        className="newPostInput"
        name="content"
        value={textboxValue}
        handleChange={(e) => setTextboxValue(e.target.value)}
        placeholder="What's happening?"
        handleInput={handleInputChange}
      />
      <StyledContainer>
        <StyledButton 
          className="newPostButton"
          type="submit"
          text="Create"
          disabled={!textboxValue}
        />
      </StyledContainer>
    </StyledForm>
  )
}

export default PostForm