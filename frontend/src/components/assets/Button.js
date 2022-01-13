import React from 'react'

const Button = ({ type="button" ,text, handleClick }) => {
  return (
    <button type={type} onClick={handleClick}>{text}</button>
  )
}

export default Button