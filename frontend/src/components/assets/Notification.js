import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

const StyledContainer = styled.div`
  position: absolute;
  top: 30px; left: 50%;
  transform: translateX(-50%);
  max-width: 400px;
  background: ${props => props.error ? 'rgba(230, 105, 105, 0.7)' : 'rgba(105, 230, 105, 0.7)'};
  border-radius: 20px;
  z-index: 100;
`

const StyledText = styled.p`
  padding: 5px 10px;
  color: rgb(240, 240, 240);
  font-size: 1.3rem;
  text-align: center;
`

const Notification = () => {
  const [message, setMessage] = useState(null)
  const [isError, setIsError] = useState(false)
  const notification = useSelector(state => state.notification);

  useEffect(() => {
    if (notification && notification.text) {
      setMessage(notification.text)
      setIsError(notification.error)
    } else {
      setMessage(null)
    }
  }, [notification])

  if (!message) {
    return null
  }

  return (
    <StyledContainer className="notificationContainer" error={isError}>
      <StyledText>
        {message}
      </StyledText>
    </StyledContainer>
  )
}

export default Notification