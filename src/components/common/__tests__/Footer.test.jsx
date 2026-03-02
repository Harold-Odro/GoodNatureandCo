import { describe, it, expect } from 'vitest'
import { render, screen } from '../../../test/utils'
import { Footer } from '../Footer'

describe('Footer', () => {
  describe('minimal variant', () => {
    it('renders copyright with site name', () => {
      render(<Footer variant="minimal" />)
      expect(screen.getByText(/Good Nature/i)).toBeInTheDocument()
    })

    it('displays current year', () => {
      render(<Footer variant="minimal" />)
      const currentYear = new Date().getFullYear()
      expect(screen.getByText(new RegExp(currentYear.toString()))).toBeInTheDocument()
    })

    it('does not show quick links in minimal variant', () => {
      render(<Footer variant="minimal" />)
      expect(screen.queryByText('Quick Links')).not.toBeInTheDocument()
    })
  })

  describe('full variant (floral)', () => {
    it('renders brand name and tagline', () => {
      render(<Footer variant="floral" />)
      expect(screen.getByText('Good Nature')).toBeInTheDocument()
    })

    it('renders quick links section', () => {
      render(<Footer variant="floral" />)
      expect(screen.getByText('Quick Links')).toBeInTheDocument()
    })

    it('renders navigation links', () => {
      render(<Footer variant="floral" />)
      expect(screen.getByText('Floral Artistry')).toBeInTheDocument()
      expect(screen.getByText('Portfolio')).toBeInTheDocument()
      expect(screen.getByText('Contact')).toBeInTheDocument()
    })

    it('renders contact section', () => {
      render(<Footer variant="floral" />)
      expect(screen.getByText('Get in Touch')).toBeInTheDocument()
    })

    it('displays phone number', () => {
      render(<Footer variant="floral" />)
      expect(screen.getByText(/\(202\) 948-4515/)).toBeInTheDocument()
    })

    it('displays email', () => {
      render(<Footer variant="floral" />)
      expect(screen.getByText(/goodnatureandco@gmail.com/)).toBeInTheDocument()
    })

    it('renders social media links with proper accessibility', () => {
      render(<Footer variant="floral" />)
      expect(screen.getByLabelText('Instagram')).toBeInTheDocument()
      expect(screen.getByLabelText('Pinterest')).toBeInTheDocument()
    })

    it('social links open in new tab', () => {
      render(<Footer variant="floral" />)
      const instagramLink = screen.getByLabelText('Instagram')
      expect(instagramLink).toHaveAttribute('target', '_blank')
      expect(instagramLink).toHaveAttribute('rel', 'noopener noreferrer')
    })

    it('displays service area', () => {
      render(<Footer variant="floral" />)
      expect(screen.getByText(/Reston, Virginia/)).toBeInTheDocument()
    })

    it('renders copyright in bottom bar', () => {
      render(<Footer variant="floral" />)
      const currentYear = new Date().getFullYear()
      expect(screen.getByText(new RegExp(`© ${currentYear}`))).toBeInTheDocument()
    })
  })

  describe('default variant', () => {
    it('uses floral variant by default', () => {
      render(<Footer />)
      expect(screen.getByText('Quick Links')).toBeInTheDocument()
    })
  })
})
