import React from 'react'
import styled from 'styled-components'
import { Outlet } from 'react-router-dom'

const StyledContent = styled.div`
  flex: 6 1 0;
  overflow-y: scroll;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE 10+ */

  &::-webkit-scrollbar { /* WebKit */
    width: 0;
    height: 0;
  }


  @media (min-width: 960px) {
    flex; 4 1 0;
  }
`

const Content = () => {
  return (
    <StyledContent>
      <Outlet />
    </StyledContent>
  )
}

export default Content