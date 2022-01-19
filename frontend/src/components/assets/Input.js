import React from 'react'

const Input = ({ className, id, name, type, value, handleChange, placeholder='' }) => {
  return(
    <input 
      className={className}
      id={id}
      name={name}
      type={type}
      onChange={handleChange}
      value={value}
      placeholder={placeholder}
      autoComplete="off"
    />
  )
}

export default Input