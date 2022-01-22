import React from 'react'

const Button = ({ className, type="button" ,text, handleClick, disabled }) => {
  return (
    <button className={className} type={type} onClick={handleClick} disabled={disabled}>{text}</button>
  )
}

export default Button