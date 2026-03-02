import { describe, it, expect } from 'vitest'
import { render, screen } from '../../../test/utils'
import { SkipLink } from '../SkipLink'

describe('SkipLink', () => {
  it('renders a skip link', () => {
    render(<SkipLink />)
    const link = screen.getByText('Skip to main content')
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', '#main-content')
  })

  it('is visually hidden by default', () => {
    render(<SkipLink />)
    const link = screen.getByText('Skip to main content')
    expect(link.className).toContain('sr-only')
  })
})
