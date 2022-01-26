import React from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSmog, faHome , faSearch, faUser, faCloudSunRain } from '@fortawesome/free-solid-svg-icons'

const StyledIcon = styled.div`
  padding: 7px;
  margin: 0 auto;
`
const StyledContainer = styled.div`
  width: 55px;
  height: 55px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: background .2s;

  &:hover {
    background: rgba(100, 100, 100, 0.2);
    cursor: pointer;
  }
`

const Icon = ({ iconType, handleNavigate }) => {
  return (
    <StyledIcon>
        <StyledContainer onClick={handleNavigate}>
          <FontAwesomeIcon 
            icon={
              iconType === 'search'
              ? faSearch
              : iconType === 'profile'
              ? faUser
              : iconType === 'weather'
              ? faCloudSunRain
              : iconType === 'home'
              ? faHome
              : faSmog
            } 
            size="2x"
          />
        </StyledContainer>
      </StyledIcon>
  )
}

export default Icon