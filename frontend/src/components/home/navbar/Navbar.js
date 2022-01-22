import React from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import Icon from './Icon'
import Button from '../../assets/Button'
import { logoutUser } from '../../../reducers/loginReducer'
import { useDispatch } from 'react-redux'

const StyledContainer = styled.div`
  padding-bottom: 20px;
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
        <Icon iconType="logo" handleNavigate={() => navigate('home')} />
        <Icon iconType="home" handleNavigate={() => navigate('home')} />
        <Icon iconType="search" handleNavigate={() => navigate('home')} />
        <Icon iconType="profile" handleNavigate={() => navigate(`user/${user.username}`)} />
        <Icon iconType="weather" />
      </StyledNav>
      <Button type='button' text='logout' handleClick={handleLogout} />
    </StyledContainer>
  )
}

export default Navbar