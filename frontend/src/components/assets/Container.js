import React from 'react'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import { closeModal } from '../../reducers/modalReducer'

const OuterContainer = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: rgba(91, 112, 131, 0.7);
  display: flex;
  flex-basis: auto;
  justify-content: center;
  align-items: center;
  top: 0;

`

const InnerContainer = styled.div`
  display: flex;
  width: 80%;
  max-width: 400px;
  padding: 30px 0;
  flex-direction: column;
  align-items: center;
  background: rgb(60, 60, 60);
  border-radius: 10px;
  position: relative;

  .cancel {
    position: absolute;
    top: 8px; left: 8px;
    width: 25px;
    height: 25px;
    border-radius: 50%;
  }

  .cancel:hover {
    background: rgb(50, 50, 50);
    cursor: pointer;
  }

  .cancel:after {
    position: relative;
    color: white;
    content: "\\00d7";
    font-size: 20px;
    margin-left: 6px;
  }
`

const Container = (props) => {
  const dispatch = useDispatch()

  return (
    <OuterContainer>
      <InnerContainer>
        <div className="cancel" onClick={() => dispatch(closeModal())}></div>
        {props.children}
      </InnerContainer>
    </OuterContainer>
  )
}

export default Container