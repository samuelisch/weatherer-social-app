import React from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import Icon from './Icon'

const StyledNav = styled.div`
  flex: 1 1 0;
  display: flex;
  flex-direction: column;
`

const Navbar = () => {
  return (
    <StyledNav>
      <Icon iconType="logo" />
      <Icon iconType="home" />
      <Icon iconType="search" />
      <Icon iconType="profile" />
      <Icon iconType="weather" />
    </StyledNav>
  )
}

export default Navbar