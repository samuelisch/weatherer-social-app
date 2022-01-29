import React from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSmog, faHome , faSearch, faUser, faCloudSunRain, faSignOutAlt, faPlus } from '@fortawesome/free-solid-svg-icons'

const StyledIcon = styled.div`
  padding: 7px;
  display: flex;
  align-items: center;

  .iconText {
    font-size: 1.7rem;
    display: none;
  }

  @media (min-width: 960px) {
    padding: 7px 0;
    width: 140px;

    .iconText {
      display: block;
    }
  }
`
const StyledContainer = styled.div`
  background: ${props => props.addIcon ? 'rgba(90, 200, 90)' : 'inherit'};
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: background .2s;

  &:hover {
    background: ${props => props.addIcon ? 'rgb(90, 190, 90)' : 'rgba(100, 100, 100, 0.2)'};
    cursor: pointer;
  }

  @media (min-width: 960px) {
    width: 120px;
    border-radius: 20px;
    justify-content: left;
    
    .icon {
      padding: 10px;
      ${props => props.addIcon? 'display: none' : ''};
    }

    .iconText {
      width: 100%;
      text-align: center;
    }
  }
`

const Icon = ({ iconType, text, handleNavigate }) => {
  return (
    <StyledIcon>
        <StyledContainer onClick={handleNavigate} addIcon={iconType==="add"}>
          <FontAwesomeIcon 
            className="icon"
            icon={
              iconType === 'search'
              ? faSearch
              : iconType === 'profile'
              ? faUser
              : iconType === 'weather'
              ? faCloudSunRain
              : iconType === 'home'
              ? faHome
              : iconType === 'logout'
              ? faSignOutAlt
              : iconType === 'add'
              ? faPlus
              : faSmog
            } 
            size="2x"
          />
          <span className="iconText">{text}</span>
        </StyledContainer>
      </StyledIcon>
  )
}

export default Icon