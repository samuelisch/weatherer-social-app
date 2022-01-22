import React from 'react'

const Textbox = ({ className, name, handleInput, handleChange, placeholder='' }) => {
  return (
    <textarea
      className={className}
      name={name}
      onInput={handleInput}
      onChange={handleChange}
      placeholder={placeholder}
      autoComplete="off"
    />
  )
}

export default Textbox