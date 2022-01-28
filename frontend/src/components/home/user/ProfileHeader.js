import React from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import MiscDetails from './MiscDetails'

const StyledContainer = styled.div`
  padding: 10px;
  border: 1px solid rgb(85, 85, 85);
  border-width: 0 1px 1px;

  .info {
    display: flex;
    align-items: center;
    margin-bottom: 15px;
  }

  .backIcon {
    padding: 7px;
    font-size: 1.5rem;
    border-radius: 50%;
    transition: background-color 0.2s;

    &:hover {
      cursor: pointer;
      background-color: rgba(215, 215, 215, 0.2);
    }
  }

  .description {
    margin: 0 15px;
    font-weight: bold;
    font-size: 1.8rem;
  }
`

const StyledNameDetails = styled.div`
  .name {
    font-weight: bold;
    font-size: 1.9rem;
  }

  .username {
    font-size: 1.3rem;
    color: rgb(150, 150, 150);
  }
`

const ProfileHeader = ({ user }) => {
  const navigate = useNavigate()

  if (!user) {
    return (
      <h1>Profile not found</h1>
    )
  }

  return (
    <StyledContainer>
      <div className="info">
        <FontAwesomeIcon className="backIcon" icon={faArrowLeft} onClick={() => navigate(-1)} />
        <span className="description">Profile</span>
      </div>
      <StyledNameDetails>
        <div className="name">{user.name}</div>
        <div className="username">@{user.username}</div>  
      </StyledNameDetails>
      <MiscDetails joinedDate={user.date} />
    </StyledContainer>
  )
}

export default ProfileHeader