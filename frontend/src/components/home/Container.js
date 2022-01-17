import React from 'react'
import styled from 'styled-components'

const OuterContainer = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: rgba(91, 112, 131, 0.4);
  display: flex;
  flex-basis: auto;
  justify-content: center;
  align-items: center;

`

const InnerContainer = styled.div`
  position: relative;
  dispaly: flex;
  flex-direction: column;
  align-items: center;
`

const Container = (props) => {
  return (
    <OuterContainer>
      <InnerContainer>
        {props.children}
      </InnerContainer>
    </OuterContainer>
  )
}

export default Container