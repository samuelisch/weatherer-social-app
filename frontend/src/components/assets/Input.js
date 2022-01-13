import React from 'react'

const Input = ({ name, type, value, handleChange, placeholder='' }) => {
  return(
    <input 
      name={name}
      type={type}
      onChange={handleChange}
      value={value}
      placeholder={placeholder}
    />
  )
}

export default Input