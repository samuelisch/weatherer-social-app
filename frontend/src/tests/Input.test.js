import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Input from '../components/assets/Input'

describe('input renders', () => {
  it('renders', () => {
    const mockFunction = jest.fn()
    const component = render(
      <Input type="text" handleChange={mockFunction} />
    )
    const queryInput = component.container.querySelector('input')
    
    expect(queryInput).toBeDefined()
  })
})

describe('input typing', () => {
  it('accepts event when input is text', () => {
    const component = render(
      <Input type="text" />
    )
    const input = component.container.querySelector('input')
    fireEvent.change(input, {
      target: {value: 'testing input'}
    })
    const queryInput = component.container.querySelector('input')

    expect(queryInput.value).toBe('testing input')
  })

  it('remains empty when input type is number', () => {
    const component = render(
      <Input type="number" />
    )
    const input = component.container.querySelector('input')
    fireEvent.change(input, {
      target: {value: 'testing input'}
    })
    const queryInput = component.container.querySelector('input')

    expect(queryInput.value).not.toBe('testing input')
  })
})