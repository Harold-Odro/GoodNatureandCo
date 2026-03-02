import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '../../../test/utils'
import userEvent from '@testing-library/user-event'
import { Header } from '../Header'

const mockNavItems = [
  { path: '/home', label: 'Home' },
  { path: '/about', label: 'About' },
  { path: '/contact', label: 'Contact' },
]

describe('Header', () => {
  it('renders the logo', () => {
    render(<Header />)
    expect(screen.getByAltText('Good Nature')).toBeInTheDocument()
  })

  it('renders navigation items when provided', () => {
    render(<Header navItems={mockNavItems} />)
    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('About')).toBeInTheDocument()
    expect(screen.getByText('Contact')).toBeInTheDocument()
  })

  it('does not render navigation when navItems is empty', () => {
    render(<Header navItems={[]} />)
    expect(screen.queryByRole('navigation')).not.toBeInTheDocument()
  })

  it('shows mobile menu button when nav items exist', () => {
    render(<Header navItems={mockNavItems} />)
    expect(screen.getByLabelText('Toggle menu')).toBeInTheDocument()
  })

  it('does not show mobile menu button when no nav items', () => {
    render(<Header />)
    expect(screen.queryByLabelText('Toggle menu')).not.toBeInTheDocument()
  })

  it('toggles mobile menu on button click', async () => {
    const user = userEvent.setup()
    render(<Header navItems={mockNavItems} />)

    const menuButton = screen.getByLabelText('Toggle menu')

    // Initially mobile menu should be hidden (nav has md:hidden class)
    const desktopNav = screen.getByRole('navigation', { hidden: true })
    expect(desktopNav).toBeInTheDocument()

    // Click to open mobile menu
    await user.click(menuButton)

    // Check for mobile nav (shows all links again in mobile menu)
    const allHomeLinks = screen.getAllByText('Home')
    expect(allHomeLinks.length).toBeGreaterThan(1)
  })

  it('shows cart button when showCart is true', () => {
    render(<Header showCart={true} />)
    expect(screen.getByLabelText(/cart/i)).toBeInTheDocument()
  })

  it('does not show cart button when showCart is false', () => {
    render(<Header showCart={false} />)
    expect(screen.queryByLabelText(/cart/i)).not.toBeInTheDocument()
  })

  it('logo is a link when logoLinkTo is provided', () => {
    render(<Header logoLinkTo="/" />)
    const logoLink = screen.getByRole('link')
    expect(logoLink).toHaveAttribute('href', '/')
  })

  it('applies active styles to current route nav item', () => {
    render(<Header navItems={mockNavItems} />, { route: '/home' })
    const homeLink = screen.getAllByText('Home')[0]
    expect(homeLink).toHaveClass('text-sage-700')
  })
})
