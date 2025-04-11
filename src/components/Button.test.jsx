import { render, screen } from '@testing-library/react'
import Button from './Button'

describe('Button', () => {
  it('renders button with correct text', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole('button')).toHaveTextContent('Click me')
  })

  it('applies custom className', () => {
    render(<Button className="custom-class">Click me</Button>)
    expect(screen.getByRole('button')).toHaveClass('custom-class')
  })
})
