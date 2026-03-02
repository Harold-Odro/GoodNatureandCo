import { describe, it, expect } from 'vitest'
import { render, screen } from '../../../test/utils'
import { Logo } from '../Logo'

describe('Logo', () => {
  it('renders the logo image with alt text', () => {
    render(<Logo />)
    const img = screen.getByAltText('Good Nature')
    expect(img).toBeInTheDocument()
  })

  it('renders as static element when no linkTo provided', () => {
    render(<Logo />)
    expect(screen.queryByRole('link')).not.toBeInTheDocument()
  })

  it('renders as a link when linkTo is provided', () => {
    render(<Logo linkTo="/" />)
    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', '/')
  })

  it('uses main logo for full variant', () => {
    render(<Logo variant="full" />)
    const img = screen.getByAltText('Good Nature')
    expect(img).toHaveAttribute('src', '/images/logo-main.jpg')
  })

  it('uses alt logo for icon variant', () => {
    render(<Logo variant="icon" />)
    const img = screen.getByAltText('Good Nature')
    expect(img).toHaveAttribute('src', '/images/logo-alt.jpg')
  })

  it('applies correct size classes', () => {
    const { rerender, container } = render(<Logo size="sm" />)
    expect(container.querySelector('div')).toHaveClass('h-10')

    rerender(<Logo size="md" />)
    expect(container.querySelector('div')).toHaveClass('h-14')

    rerender(<Logo size="lg" />)
    expect(container.querySelector('div')).toHaveClass('h-20')

    rerender(<Logo size="xl" />)
    expect(container.querySelector('div')).toHaveClass('h-28')
  })

  it('applies custom className to image', () => {
    render(<Logo className="custom-class" />)
    const img = screen.getByAltText('Good Nature')
    expect(img).toHaveClass('custom-class')
  })
})
