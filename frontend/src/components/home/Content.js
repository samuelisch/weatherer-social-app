import React from 'react'
import styled from 'styled-components'
import { Outlet } from 'react-router-dom'

const StyledContent = styled.div`
  flex: 6 1 0;
`

const Content = () => {
  return (
    <StyledContent>
      <Outlet />
    </StyledContent>
  )
}

export default Content