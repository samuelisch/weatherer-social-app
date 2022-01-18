import React from 'react'

const Button = ({ className, type="button" ,text, handleClick }) => {
  return (
    <button className={className} type={type} onClick={handleClick}>{text}</button>
  )
}

export default Button