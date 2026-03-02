import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '../../../test/utils'
import { ThemeToggle } from '../ThemeToggle'

describe('ThemeToggle', () => {
  it('renders with light mode label by default', () => {
    render(<ThemeToggle />)
    const button = screen.getByRole('button', { name: /switch to dark mode/i })
    expect(button).toBeInTheDocument()
  })

  it('toggles theme on click', () => {
    render(<ThemeToggle />)
    const button = screen.getByRole('button')
    fireEvent.click(button)
    expect(screen.getByRole('button', { name: /switch to light mode/i })).toBeInTheDocument()
  })
})
