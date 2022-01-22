import React from 'react'
import styled from 'styled-components'

const StyledIcon = styled.div`
  padding: 7px;
  margin: 0 auto;
`
const StyledContainer = styled.div`
  width: 55px;
  height: 55px;
  border-radius: 50%;

  &:hover {
    background: rgba(100, 100, 100, 0.2);
    cursor: pointer;
  }
`

const Icon = ({iconType}) => {
  return (
    <StyledIcon>
        <StyledContainer>
          <span>icon</span>
        </StyledContainer>
      </StyledIcon>
  )
}

export default Icon