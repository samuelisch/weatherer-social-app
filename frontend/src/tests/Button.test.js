import Button from '../components/assets/Button'
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'

describe('button rendering', () => {
  it('renders a button element', () => {
    const component = render(<Button text="hello world" />)
  
    expect(component.container).toHaveTextContent('hello world')
  })
  
  it('displays correct alternative text', () => {
    const component = render(<Button text="testing button" />)
  
    expect(component.container).toHaveTextContent('testing button')
  })
})

describe('button click', () => {
  it('fires mock event when clicked', () => {
    const mockEvent = jest.fn()
    const component = render(<Button text="test" handleClick={mockEvent} />)
    const button = component.getByText('test')
    fireEvent.click(button)
  
    expect(mockEvent.mock.calls).toHaveLength(1)
  })

  it('fires mock event twice when clicked twice', () => {
    const mockEvent = jest.fn()
    const component = render(<Button text="test" handleClick={mockEvent} />)
    const button = component.getByText('test')
    fireEvent.click(button)
    fireEvent.click(button)

    expect(mockEvent.mock.calls).toHaveLength(2)
  })
})
