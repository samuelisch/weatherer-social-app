import React from 'react'

const Input = ({ id, name, type, value, handleChange, placeholder='' }) => {
  return(
    <input 
      id={id}
      name={name}
      type={type}
      onChange={handleChange}
      value={value}
      placeholder={placeholder}
    />
  )
}

export default Input