import React from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import Icon from './Icon'
import { logoutUser } from '../../../reducers/loginReducer'
import { useDispatch } from 'react-redux'

const StyledContainer = styled.div`
  padding-bottom: 40px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const StyledNav = styled.div`
  flex: 1 1 0;
  display: flex;
  flex-direction: column;
`

const Navbar = ({ user }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleLogout = async () => {
    navigate('/main')
    await dispatch(logoutUser())
  }

  return (
    <StyledContainer>
      <StyledNav>
        <Icon iconType="logo" handleNavigate={() => navigate('/home')} />
        <Icon iconType="home" text="Home" handleNavigate={() => navigate('/home')} />
        <Icon iconType="search" text="Search" handleNavigate={() => navigate('search')} />
        <Icon iconType="profile" text="Profile" handleNavigate={() => navigate(`user/${user.username}`)} />
        <Icon iconType="weather" text="Weather" handleNavigate={() => console.log('weather')} />
        <Icon iconType="add" handleNavigate={() => console.log('add')} />
      </StyledNav>
      <Icon iconType="logout" text="Logout" handleNavigate={handleLogout} />
    </StyledContainer>
  )
}

export default Navbar