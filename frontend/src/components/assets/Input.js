import React from 'react'

const Input = ({ type, value, handleChange, placeholder='' }) => {
  return(
    <input type={type} onChange={handleChange} value={value} placeholder={placeholder} />
  )
}

export default Input